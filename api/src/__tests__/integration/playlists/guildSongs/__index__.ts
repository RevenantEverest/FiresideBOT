import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';
import { DISCORD } from '../../../support/constants/index.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { discord, youtube } from '../../../../utils/index.js';

import { SongInfo } from '../../../../types/youtube.js';
import { HandleReturn } from '../../../../types/promises.js';
import { GuildSongExtraParams } from '../../../support/types/extraParams/index.js';

import postRouteSpec from './post.route.js';
import getRouteSpec from './get.route.js';
import deleteRouteSpec from './delete.route.js';

type MockReturn<T> = Promise<HandleReturn<T>>;

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/guild";

const extraParams: GuildSongExtraParams = {
    guildId: DISCORD.TESTING_SERVER_ID,
    mocks: {
        hasPermission: (value: boolean) => {
            const spy = jest.spyOn(discord, "checkMemberPermissions");
            spy.mockImplementation(async (): MockReturn<boolean> => [value, undefined]);
        },
        isGuildMember: (value: boolean) => {
            const spy = jest.spyOn(discord, "isGuildMember");
            spy.mockImplementation(async (): MockReturn<boolean> => [value, undefined]);
        },
        hasRole: (value: boolean) => {
            const spy = jest.spyOn(discord, "hasRole");
            spy.mockImplementation(async (): MockReturn<boolean> => [value, undefined]);
        },
        handleSearch: (payload: SongInfo) => {
            const spy = jest.spyOn(youtube, "handleSearch");
            spy.mockImplementation(async (): MockReturn<SongInfo> => ([payload, undefined]));
        }
    }
};

export default () => {
    /* POST */
    describe("create route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* GET */
    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* DELETE */
    describe("delete route", () => {
        deleteRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });
};