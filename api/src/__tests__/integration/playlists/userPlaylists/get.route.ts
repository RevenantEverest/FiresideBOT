import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { UserPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/userPlaylists.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { UserPlaylist } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {
    
    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(UserPlaylist);
        const entity = repository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            discord_id: authPayload.discord_id
        });

        const playlist = await entity.save();
        extraParams.entity = playlist;

        const altEntity = repository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE_ALT,
            discord_id: authPayload.discord_id
        });

        const altPlaylist = await altEntity.save();
        extraParams.supportEntities = [altPlaylist];
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(UserPlaylist).remove(extraParams.entity as UserPlaylist);

        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(UserPlaylist).remove(extraParams.supportEntities[0] as UserPlaylist);
        }
    });

    authenticatedRouteTest(app, "get", baseEndpoint);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/id/${extraParams.entity?.id}`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/discord_id/${authPayload.discord_id}`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/discord_id/${authPayload.discord_id}/name/${extraParams.entity?.name}`);

    describe("given the user is logged in", () => {
        describe("given the id as a param", () => {
            describe("given the id doesn't exist", () => {
                it("should return 404", async () => {
                    const apiEndpoint = `${baseEndpoint}/id/123123`;
                    await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404)
                });
            });

            describe("given the id does exist", () => {
                it("should return the playlist", async () => {
                    const apiEndpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
    
                    expect(statusCode).toBe(200);
    
                    const { results } = body;
    
                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();
    
                    expect(results).toEqual({
                        id: extraParams.entity?.id,
                        discord_id: authPayload.discord_id,
                        name: extraParams.entity?.name,
                        created_at: results.created_at,
                        updated_at: results.updated_at,
                        is_public: results.is_public,
                        is_default: results.is_default,
                        songs: results.songs
                    });
                });
            });
        });

        describe("given discord id as a param", () => {
            describe("given the discord id isn't the requester's discord id", () => {
                it("should return a 403", async () => {
                    const apiEndpoint = `${baseEndpoint}/discord_id/123456789123456789`;
                    const { body, statusCode } = await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();

                    const { results } = body;

                    expect(body.count).toBe(0);
                    expect(results.length).toBe(0);
                });
            });

            describe("given the discord id does exist", () => {
                it("should return paginated playlists", async () => {

                    const altPlaylist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
    
                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();
    
                    const { results } = body;
    
                    expect(body.count).not.toBeNull();
                    expect(results[0].id).not.toBeNull();
                    expect(results[0].created_at).not.toBeNull();
                    expect(results[0].updated_at).not.toBeNull();
                    expect(results[0].duration).not.toBeNull();
                    expect(results[0].songCount).not.toBeNull();

                    expect(results[1].id).not.toBeNull();
                    expect(results[1].created_at).not.toBeNull();
                    expect(results[1].updated_at).not.toBeNull();
                    expect(results[1].duration).not.toBeNull();
                    expect(results[1].songCount).not.toBeNull();
    
                    expect(body).toEqual({
                        count: body.count,
                        next: null,
                        previous: null,
                        results: [
                            {
                                id: altPlaylist?.id,
                                discord_id: authPayload.discord_id,
                                name: altPlaylist?.name,
                                is_public: altPlaylist?.is_public,
                                is_default: altPlaylist?.is_default,
                                created_at: results[0].created_at,
                                updated_at: results[0].updated_at,
                                duration: results[0].duration,
                                songCount: results[0].songCount
                            },
                            {
                                id: extraParams.entity?.id,
                                discord_id: authPayload.discord_id,
                                name: extraParams.entity?.name,
                                is_public: extraParams.entity?.is_public,
                                is_default: extraParams.entity?.is_default,
                                created_at: results[1].created_at,
                                updated_at: results[1].updated_at,
                                duration: results[1].duration,
                                songCount: results[1].songCount
                            }
                        ]
                    });
                });
            });
        });

        describe("given the discord id and playlist name as a param", () => {
            describe("given the discord id doesn't exist", () => {
                it("should return a 404 status", async () => {
                    const apiEndpoint = `${baseEndpoint}/discord_id/123456789123456789/name/${extraParams.entity?.name}`;
                    await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404);
                });
            });

            describe("given the discord id does exist", () => {
                describe("given the playlist name doesn't exist", () => {
                    it("should return a 404 status", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}/name/not_a_real_playlist`;
                        await supertest(app)
                        .get(apiEndpoint)
                        .set(authPayload.header)
                        .expect(404);
                    });
                });

                describe("given the playlist name does exist", () => {
                    it("should return a 200 status and the playlist", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}/name/${extraParams.entity?.name}`;
                        const { body, statusCode } = await supertest(app)
                        .get(apiEndpoint)
                        .set(authPayload.header)
                        .send()
        
                        expect(statusCode).toBe(200);
        
                        const { results } = body;
        
                        expect(results.id).not.toBeNull();
                        expect(results.created_at).not.toBeNull();
                        expect(results.updated_at).not.toBeNull();
        
                        expect(results).toEqual({
                            id: extraParams.entity?.id,
                            discord_id: authPayload.discord_id,
                            name: extraParams.entity?.name,
                            is_public: extraParams.entity?.is_public,
                            is_default: extraParams.entity?.is_default,
                            created_at: results.created_at,
                            updated_at: results.updated_at,
                            duration: results.duration,
                            songCount: results.songCount
                        });
                    });
                });
            });
        });
    });
};

export default getRoute;