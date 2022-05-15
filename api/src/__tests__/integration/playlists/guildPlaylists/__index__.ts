import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';
import { DISCORD } from '../../../support/constants/index.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { discord } from '../../../../utils/index.js';

import { HandleReturn } from '../../../../types/promises.js';
import { GuildPlaylistExtraParams } from '../../../support/types/extraParams.js';

import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';
import getRouteSpec from './get.route.js';

type MockReturn = Promise<HandleReturn<boolean>>;

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/guild";

const extraParams: GuildPlaylistExtraParams = {
    guildId: DISCORD.TESTING_SERVER_ID,
    mocks: {
        hasPermission: (value: boolean) => {
            const spy = jest.spyOn(discord, "checkMemberPermissions");
            spy.mockImplementation(async (): MockReturn => [value, undefined]);
        },
        isGuildMember: (value: boolean) => {
            const spy = jest.spyOn(discord, "isGuildMember");
            spy.mockImplementation(async (): MockReturn => [value, undefined]);
        }
    }
};

export default () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /* POST */
    describe("create route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* UPDATE */
    describe("update route", () => {
        updateRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* GET */
    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* DELETE */
    describe("delete route", () => {

    });
};