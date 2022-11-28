import supertest from 'supertest';
import initializeApp from '../../../../app.js';

import issueToken from '../../../support/login.support.js';

import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';
import * as PAYLOADS from '../../../support/payloads/userPlaylists.payloads.js';

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
        /* Create extra public playlist */
        describe("seedings", () => {
            it("should save an extra public playlist", async () => {
                const { body, status } = await supertest(app)
                .post(baseEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE_ALT)

                expect(status).toBe(200);

                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: results.id,
                    discord_id: authPayload.discord_id,
                    name: PAYLOADS.VALID_CREATE_ALT.name,
                    is_public: true, // Should be true by default
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });

                extraParams.secondaryPlaylist = results;
            });
        });

        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    // /* DELETE */
    // describe("delete route", () => {
        
    // });
};