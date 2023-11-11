import type { GuildPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import AppDataSource from '@@db/dataSource.js';
import initializeApp from '@@root/app.js';
import issueToken from '@@tests/support/login.support.js';
import { DISCORD } from '@@tests/support/constants/index.js';

import { connectToTestingDatabase } from '@@tests/support/database.support.js';
import { DB_TIMEOUT } from '@@tests/support/constants/database.js';
import { hasPermission, isGuildMember } from '@@tests/support/mocks/index.js';

import * as AUTH_PAYLOADS from '@@tests/support/payloads/auth.payloads.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';

jest.mock('@@utils/discord.js', () => {
    const original = jest.requireActual('@@utils/discord.js');

    return {
        __esModule: true,
        ...original,
        checkMemberPermissions: jest.fn(),
        isGuildMember: jest.fn()
    };
});

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/guild";

const extraParams: GuildPlaylistExtraParams = {
    guildId: DISCORD.TESTING_SERVER_ID,
    mocks: { hasPermission, isGuildMember }
};

describe("Guild Playlists", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(async () => {
        await AppDataSource.destroy();
        jest.clearAllMocks();
    });

    /* GET */
    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* POST */
    describe("create route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    // /* UPDATE */
    describe("update route", () => {
        updateRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });
});


    