import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/userPlaylists.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { UserPlaylistExtraParams } from '../../../support/types/extraParams/index.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .post(baseEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitespace", () => {
            it("should return a 400 status", async () => {
                await supertest(app)
                .post(baseEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.INVALID)
                .expect(400)
            });
        });

        describe("given the correct payload", () => {
            describe("given the playlist name doesn't exist", () => {
                it("should return a 200 status and the user playlist", async () => {
                    const { body, statusCode } = await supertest(app)
                    .post(baseEndpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
    
                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();
    
                    const { results } = body;
    
                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();
    
                    expect(results).toEqual({
                        id: results.id,
                        discord_id: authPayload.discord_id,
                        name: PAYLOADS.VALID_CREATE.name,
                        is_public: true, // Should be true by default
                        is_default: false, // should be false by default
                        created_at: results.created_at,
                        updated_at: results.updated_at
                    });

                    extraParams.createdPlaylist = results;
                });
            });

            describe("given the playlist name already exists", () => {
                it("should return a 400 status", async () => {
                    await supertest(app)
                    .post(baseEndpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(400);
                });
            });
        });
    });
};

export default postRoute;