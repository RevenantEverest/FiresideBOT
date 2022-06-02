import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { UserPlaylistExtraParams } from '../../../support/types/extraParams/index.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const extraParams: UserPlaylistExtraParams = {};

export default () => {
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