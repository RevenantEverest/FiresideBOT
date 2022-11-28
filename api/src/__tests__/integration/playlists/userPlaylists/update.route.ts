import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/userPlaylists.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { UserPlaylistExtraParams } from '../../../support/types/extraParams/index.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const apiEndpoint = `${baseEndpoint}/id/${extraParams.createdPlaylist?.id}`;
            await supertest(app)
            .put(apiEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitespace", () => {
            it("should return a 400 status", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.createdPlaylist?.id}`;
                await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.INVALID)
                .expect(400)
            });
        });

        describe("given the playlist name already exists", () => {
            it("should return a 400 status", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.createdPlaylist?.id}`;
                await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(400)
            });
        });

        describe("given the correct payload", () => {
            it("should return a 200 status and the playlist", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.createdPlaylist?.id}`;
                const { body, statusCode } = await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_UPDATE)

                expect(statusCode).toBe(200);

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.createdPlaylist?.id,
                    discord_id: authPayload.discord_id,
                    name: PAYLOADS.VALID_UPDATE.name,
                    created_at: extraParams.createdPlaylist?.created_at,
                    updated_at: results.updated_at,
                    is_public: extraParams.createdPlaylist?.is_public
                });

                extraParams.createdPlaylist = results;
            });
        });

        describe("given the public value changes", () => {
            it("should return a 200 status and the updated playlist", async () => {
                const endpoint = `${baseEndpoint}/id/${extraParams.createdPlaylist?.id}`;
                const { body, statusCode } = await supertest(app)
                .put(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_PUBLIC_UPDATE)

                expect(statusCode).toBe(200);

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.createdPlaylist?.id,
                    discord_id: authPayload.discord_id,
                    name: PAYLOADS.VALID_UPDATE.name,
                    created_at: extraParams.createdPlaylist?.created_at,
                    updated_at: results.updated_at,
                    is_public: PAYLOADS.VALID_PUBLIC_UPDATE.is_public
                });

                console.log("Playlist Updated => ", results);

                extraParams.createdPlaylist = results;
            });
        });
    });
};

export default updateRoute;