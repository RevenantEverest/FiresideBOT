import type { UserPlaylistExtraParams } from '@@tests/support/types/extraParams';

import AppDataSource from '@@db/dataSource.js';
import initializeApp from '@@root/app.js';
import issueToken from '@@tests/support/login.support.js';
import { DISCORD } from '@@tests/support/constants/index.js';
import { UserPlaylist } from '@@entities/index.js';

import { connectToTestingDatabase } from '@@tests/support/database.support.js';
import { DB_TIMEOUT } from '@@tests/support/constants/database.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const extraParams: UserPlaylistExtraParams = {
    guildId: DISCORD.TESTING_SERVER_ID,
    mocks: null
};

describe("User Playlist", () => {
    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(async () => {
        await AppDataSource.destroy();
        jest.clearAllMocks();
    });

    /* Get */
    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* Post */
    describe("post route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* Update */
    describe("update route", () => {
        updateRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });
});