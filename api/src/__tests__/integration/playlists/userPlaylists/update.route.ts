import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { UserPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/userPlaylists.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { UserPlaylist } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {

    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(UserPlaylist);
        const entity = repository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            discord_id: authPayload.discord_id
        });

        const playlist = await entity.save();
        extraParams.entity = playlist;
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(UserPlaylist).remove(extraParams.entity as UserPlaylist);
    });

    authenticatedRouteTest(app, "put", `${baseEndpoint}/id/${extraParams.entity?.id}`);

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitespace", () => {
            it("should return a 400 status", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PLAYLIST_PAYLOADS.INVALID)
                .expect(400)
            });
        });

        describe("given the playlist name already exists", () => {
            it("should return a 400 status", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PLAYLIST_PAYLOADS.VALID_CREATE)
                .expect(400)
            });
        });

        describe("given the correct payload", () => {
            it("should return a 200 status and the playlist", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                const { body, statusCode } = await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PLAYLIST_PAYLOADS.VALID_UPDATE)

                expect(statusCode).toBe(200);

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.entity?.id,
                    discord_id: authPayload.discord_id,
                    name: PLAYLIST_PAYLOADS.VALID_UPDATE.name,
                    is_public: extraParams.entity?.is_public,
                    is_default: extraParams.entity?.is_default,
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });

                extraParams.entity = results;
            });
        });

        describe("given the public value changes", () => {
            it("should return a 200 status and the updated playlist", async () => {
                const endpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                const { body, statusCode } = await supertest(app)
                .put(endpoint)
                .set(authPayload.header)
                .send(PLAYLIST_PAYLOADS.VALID_PUBLIC_UPDATE)

                expect(statusCode).toBe(200);

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.entity?.id,
                    discord_id: authPayload.discord_id,
                    name: PLAYLIST_PAYLOADS.VALID_UPDATE.name,
                    is_public: PLAYLIST_PAYLOADS.VALID_PUBLIC_UPDATE.is_public,
                    is_default: extraParams.entity?.is_default,
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });

                extraParams.entity = results;
            });
        });
    });
};

export default updateRoute;