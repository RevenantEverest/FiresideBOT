import initializeApp from '../../../../app.js';
import issueToken from '../../../support/login.support.js';
import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';
import { HandleReturn } from '../../../../types/promises.js';

import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';
import getRouteSpec from './get.route.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/economy/records/guild/";

const extraParams = {

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
};