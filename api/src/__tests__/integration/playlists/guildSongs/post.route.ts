import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildSong.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSongExtraParams } from '../../../support/types/extraParams/index.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 401 status", async () => {
            await supertest(app)
            .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given an incorrect playlist id", () => {
            it("should return a 404 status", async () => {
                extraParams.mocks.hasPermission(true);
                
                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/12349/songs`)
                .set(authPayload.header)
                .send(PAYLOADS.INVALID)
                .expect(404)
            });
        });

        describe("given the user is not a guild admin or has proper guild playlist roles", () => {
            it("should return a 401 response", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.hasRole(false);

                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(401)
            });
        });

        describe("given the correct payload and user is not a guild admin but has a guild playlist role", () => {
            it("should return a 200 and the guild song", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.hasRole(true);
                extraParams.mocks.handleSearch(PAYLOADS.MOCK_RETURN);
                
                const { body, statusCode } = await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();

                expect(results).toEqual({
                    id: results.id,
                    playlist: {
                        id: PAYLOADS.VALID_CREATE.playlist_id
                    },
                    title: PAYLOADS.MOCK_RETURN.title,
                    author: PAYLOADS.MOCK_RETURN.author,
                    video_id: PAYLOADS.MOCK_RETURN.videoId,
                    duration: PAYLOADS.MOCK_RETURN.duration,
                    thumbnail_url: PAYLOADS.MOCK_RETURN.thumbnail_url,
                    created_at: results.created_at
                });

                extraParams.createdSong = results;
            });
        });

        describe("given a duplicate song", () => {
            it("should return a 400 response", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.handleSearch(PAYLOADS.MOCK_RETURN);

                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(400)
            });
        });

        describe("given a user is not premium", () => {
            describe("given a song length longer than 10 minutes", () => {
                it("should return a 400 response", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.handleSearch(PAYLOADS.INVALID_NON_PREMIUM_MOCK_RETURN);
                
                    await supertest(app)
                    .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(400)
                });
            });

            describe("given a song length is 10 minutes or less", () => {
                it("should return a 200 response", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.handleSearch(PAYLOADS.VALID_NON_PREMIUM_MOCK_RETURN);

                    await supertest(app)
                    .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/songs`)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(200)
                });
            });
        });
    });
};

export default postRoute;