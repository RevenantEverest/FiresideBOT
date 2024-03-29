import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { discordServices } from '../../../services/index.js';
import DiscordToken from '../../../entities/DiscordToken.js';
import User from '../../../entities/User.js';

import issueToken from '../../../middleware/issueToken.js';

import { ENV } from '../../../constants/index.js';
import { promises, entities, errors } from '../../../utils/index.js';

async function login(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    const redirectUri = ENV.DISCORD.REDIRECT_URI as string;

    /* Get Auth Token */
    const tokenPromise = discordServices.getToken(code, redirectUri);
    const [token, tokenErr] = await promises.handle<AxiosResponse>(tokenPromise);

    if(tokenErr) return errors.sendResponse({ res, err: tokenErr, message: "Token Promise Error" });
    if(!token) return errors.sendResponse({ res, message: "No Token Response" });

    /* Get Discord User with Auth Token */
    const discordUserPromise = discordServices.getUserInfo(token.data.access_token);
    const [discordUser, discordUserErr] = await promises.handle<AxiosResponse>(discordUserPromise);

    if(discordUserErr) return errors.sendResponse({ res, err: discordUserErr, message: "Discord User Promise Error" });
    if(!discordUser) return errors.sendResponse({ res, message: "No Discord User Response" });

    /* Grab Discord Token from DB */
    const discordTokenConditional = {
        where: {
            discord_id: discordUser.data.id
        }
    };
    const [discordToken, discordTokenErr] = await entities.findAndSaveOrUpdate<DiscordToken>(DiscordToken, discordTokenConditional, {
        ...token.data,
        discord_id: discordUser.data.id
    });

    if(discordTokenErr) return errors.sendResponse({ res, err: discordTokenErr, message: "Discord Token DB Error" });
    if(!discordToken) return errors.sendResponse({ res, message: "No Discord Token Response" });

    const userConditional = {
        where: {
            discord_id: discordUser.data.id
        }
    };
    const [user, userErr] = await entities.findOrSave<User>(User, userConditional, {
        ...userConditional,
        email: discordUser.data.email
    });

    if(userErr) return errors.sendResponse({ res, err: userErr, message: "User DB Error" });
    if(!user) return errors.sendResponse({ res, message: "No User Response" });

    const payload = {
        id: user.id,
        discord_id: discordUser.data.id,
        username: discordUser.data.username,
        discriminator: discordUser.data.discriminator,
        avatar: discordUser.data.avatar
    };

    issueToken(res, payload);
};

export default login;