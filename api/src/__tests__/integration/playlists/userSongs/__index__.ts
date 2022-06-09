import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { youtube } from '../../../../utils/index.js';

import { SongInfo } from '../../../../types/youtube.js';
import { HandleReturn } from '../../../../types/promises.js';
import { UserSongExtraParams } from '../../../support/types/extraParams/index.js';

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

export default () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

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

    });
};