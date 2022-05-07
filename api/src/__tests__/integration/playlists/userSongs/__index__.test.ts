import AppDataSource from '../../../../db/dataSource.js';
import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';
import { connectToTestingDatabase } from '../../../support/database.support.js';
import { DB_TIMEOUT } from '../../../support/constants/database.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { youtube } from '../../../../utils/index.js';

import { SongInfo } from '../../../../types/youtube.js';
import { HandleReturn } from '../../../../types/promises.js';
import { UserSongExtraParams } from '../../../support/types/extraParams.js';

import postRouteSpec from './post.route.js';
import getRouteSpec from './get.route.js';

type MockReturn = Promise<HandleReturn<SongInfo>>;

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const extraParams: UserSongExtraParams = {
    mocks: {
        handleSearch: (payload: SongInfo) => {
            const spy = jest.spyOn(youtube, "handleSearch");
            spy.mockImplementation(async (): MockReturn => ([payload, undefined]));
        }
    }
};

describe("user songs", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /* POST */
    describe("create user song route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* GET */
    describe("get user song route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    /* DELETE */
    describe("delete user song route", () => {

    });
});