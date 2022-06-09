import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildSong.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSongExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/songs`)
            .expect(403)

            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/id/1/songs`)
            .expect(403)

            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/id/1/songs/id/1`)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is a guild member", () => {
            describe("given the guild id and playlist id as a param", () => {
                describe("given the guild id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated resonse", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/81726110987/id/1/songs`;
                        const { body, statusCode } = await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()

                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBe(null);

                        const { results } = body;

                        expect(body.count).not.toBeNull();
                        expect(results.length).toBe(0);
                    });
                });

                describe("given the playlist id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/81625/songs`;
                        const { body, statusCode } = await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()

                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBeNull();

                        const { results } = body;

                        expect(body.count).not.toBeNull();
                        expect(results.length).toBe(0);
                    });
                });
                
                describe("given the song id as a param", () => {
                    describe("given the song id doesn't exist", () => {
                        it("should return a 404 status", async () => {
                            extraParams.mocks.isGuildMember(true);

                            const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/1/songs/918273`;
                            await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .expect(404)
                        });
                    });

                    describe("given the song id exists", () => {
                        it("should return the guild song", async () => {
                            extraParams.mocks.isGuildMember(true);

                            const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/1/songs/id/${extraParams.createdSong?.id}`;
                            const { body, statusCode } = await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .send()

                            expect(statusCode).toBe(200);
                            expect(body.results).not.toBeNull();

                            const { results } = body;

                            expect(results).toEqual({
                                id: extraParams.createdSong?.id,
                                title: extraParams.createdSong?.title,
                                author: extraParams.createdSong?.author,
                                video_id: extraParams.createdSong?.video_id,
                                duration: extraParams.createdSong?.duration,
                                thumbnail_url: extraParams.createdSong?.thumbnail_url,
                                created_at: extraParams.createdSong?.created_at
                            });
                        });
                    });
                });

                it("should return paginated songs", async () => {
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/1/songs`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();

                    const { results } = body;

                    expect(body.count).not.toBeNull();
                    expect(results[0].id).not.toBeNull();
                    expect(results[0].created_at).not.toBeNull();

                    expect(results[0]).toEqual({
                        id: extraParams.createdSong?.id,
                        title: extraParams.createdSong?.title,
                        author: extraParams.createdSong?.author,
                        video_id: extraParams.createdSong?.video_id,
                        duration: extraParams.createdSong?.duration,
                        thumbnail_url: extraParams.createdSong?.thumbnail_url,
                        created_at: extraParams.createdSong?.created_at
                    });
                });
            });
        });
    });
};

export default getRoute;