import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { UserPlaylistExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .get(baseEndpoint)
            .expect(403)
        });
    });

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
                    const apiEndpoint = `${baseEndpoint}/id/1`;
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
                        id: extraParams.createdPlaylist?.id,
                        discord_id: authPayload.discord_id,
                        name: extraParams.createdPlaylist?.name,
                        created_at: extraParams.createdPlaylist?.created_at,
                        updated_at: results.updated_at,
                        songs: results.songs
                    });
                });
            });
        });

        describe("given discord id as a param", () => {
            describe("given the discord id isn't the requester's discord id", () => {
                it("should return a 403", async () => {
                    const apiEndpoint = `${baseEndpoint}/discord_id/123456789123456789`;
                    await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(403);
                });
            });

            describe("given the discord id does exist", () => {
                it("should return paginated playlists", async () => {
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
    
                    expect(body).toEqual({
                        count: body.count,
                        next: null,
                        previous: null,
                        results: [{
                            id: extraParams.createdPlaylist?.id,
                            discord_id: authPayload.discord_id,
                            name: extraParams.createdPlaylist?.name,
                            created_at: extraParams.createdPlaylist?.created_at,
                            updated_at: results[0].updated_at
                        }]
                    });
                });
            });
        });

        describe("given the discord id and playlist name as a param", () => {
            describe("given the discord id doesn't exist", () => {
                it("should return a 403 status", async () => {
                    const apiEndpoint = `${baseEndpoint}/discord_id/123456789123456789/name/${extraParams.createdPlaylist?.name}`;
                    await supertest(app)
                    .get(apiEndpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(403);
                });
            });

            describe("given the discord id does exist", () => {
                describe("given the playlist name doesn't exist", () => {
                    it("should return a 404 status", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}/name/${extraParams.createdPlaylist?.name}`;
                        await supertest(app)
                        .get(apiEndpoint)
                        .set(authPayload.header)
                        .send()
                        .expect(404);
                    });
                });

                describe("given the playlist name does exist", () => {
                    it("should return a 200 status and the playlist", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}/name/${extraParams.createdPlaylist?.name}`;
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
                            id: extraParams.createdPlaylist?.id,
                            discord_id: authPayload.discord_id,
                            name: extraParams.createdPlaylist?.name,
                            created_at: extraParams.createdPlaylist?.created_at,
                            updated_at: results.updated_at,
                            songs: results.songs
                        });
                    });
                });
            });
        });
    });
};

export default getRoute;