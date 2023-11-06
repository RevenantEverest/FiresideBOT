import type { Application } from 'express';
import { AuthTestingPayload } from '@@tests/support/types/auth.js';
import { UserPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/userPlaylists.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { UserPlaylist } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(UserPlaylist).remove(extraParams.entity as UserPlaylist);
    });

    authenticatedRouteTest(app, "post", baseEndpoint);

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitespace", () => {
            it("should return a 400 status", async () => {
                await supertest(app)
                .post(baseEndpoint)
                .set(authPayload.header)
                .send(PLAYLIST_PAYLOADS.INVALID)
                .expect(400)
            });
        });

        describe("given the correct payload", () => {
            describe("given the playlist name doesn't exist", () => {
                it("should return a 200 status and the user playlist", async () => {
                    const { body, statusCode } = await supertest(app)
                    .post(baseEndpoint)
                    .set(authPayload.header)
                    .send(PLAYLIST_PAYLOADS.VALID_CREATE)
    
                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();
    
                    const { results } = body;
    
                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();
    
                    expect(results).toEqual({
                        id: results.id,
                        discord_id: authPayload.discord_id,
                        name: PLAYLIST_PAYLOADS.VALID_CREATE.name,
                        is_public: true, // Should be true by default
                        is_default: false, // should be false by default
                        created_at: results.created_at,
                        updated_at: results.updated_at
                    });

                    extraParams.entity = results;
                });
            });

            describe("given the playlist name already exists", () => {
                it("should return a 400 status", async () => {
                    await supertest(app)
                    .post(baseEndpoint)
                    .set(authPayload.header)
                    .send(PLAYLIST_PAYLOADS.VALID_CREATE)
                    .expect(400);
                });
            });
        });
    });
};

export default postRoute;