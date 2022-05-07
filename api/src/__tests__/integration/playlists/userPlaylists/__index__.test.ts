import AppDataSource from '../../../../db/dataSource.js';
import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';
import { connectToTestingDatabase } from '../../../support/database.support.js';
import { DB_TIMEOUT } from '../../../support/constants/database.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { UserPlaylistExtraParams } from '../../../support/types/extraParams.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const extraParams: UserPlaylistExtraParams = {};

describe("user playlists", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
    });

    /* POST */
    describe("create user playlist route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* UPDATE */
    describe("update user playlist route", () => {
        updateRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* GET */
    describe("get user playlist route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* DELETE */
    describe("delete user playlist route", () => {
        
    });
});