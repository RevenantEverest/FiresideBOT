import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { UserSongExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/userPlaylists.payloads.js';
import * as SONG_PAYLOADS from '@@tests/support/payloads/userSongs.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { UserPlaylist, UserSong } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserSongExtraParams<UserPlaylist>) {

    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(UserPlaylist);
        const pEntity = pRepository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            discord_id: authPayload.discord_id
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(UserSong).remove(extraParams.entity as UserSong);

        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(UserPlaylist).remove(extraParams.supportEntities[0] as UserPlaylist);
        }
    });

    authenticatedRouteTest(app, "post", `${baseEndpoint}/songs`);

    describe("given the user is logged in", () => {
        describe("given an incorrect playlist id", () => {
            it("should return a 404 status", async () => {
                await supertest(app)
                .post(`${baseEndpoint}/songs`)
                .set(authPayload.header)
                .send({
                    ...SONG_PAYLOADS.INVALID,
                    playlist_id: 12837465
                })
                .expect(404)
            });
        });

        describe("given the correct payload", () => {
            it("should return a 200 status and the user song", async () => {
                extraParams.mocks.handleSearch(SONG_PAYLOADS.MOCK_RETURN);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const { body, statusCode } = await supertest(app)
                .post(`${baseEndpoint}/songs`)
                .set(authPayload.header)
                .send({
                    ...SONG_PAYLOADS.VALID_CREATE,
                    playlist_id: playlist?.id
                })

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();

                expect(results).toEqual({
                    id: results.id,
                    playlist: {
                        id: playlist?.id
                    },
                    title: SONG_PAYLOADS.MOCK_RETURN.title,
                    author: SONG_PAYLOADS.MOCK_RETURN.author,
                    video_id: SONG_PAYLOADS.MOCK_RETURN.videoId,
                    duration: SONG_PAYLOADS.MOCK_RETURN.duration,
                    thumbnail_url: SONG_PAYLOADS.MOCK_RETURN.thumbnail_url,
                    created_at: results.created_at
                });

                extraParams.entity = results;
            });
        });

        describe("given a duplicate song", () => {
            it("should return a 400 response", async () => {
                extraParams.mocks.handleSearch(SONG_PAYLOADS.MOCK_RETURN);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const { statusCode } = await supertest(app)
                .post(`${baseEndpoint}/songs`)
                .set(authPayload.header)
                .send({
                    ...SONG_PAYLOADS.VALID_CREATE,
                    playlist_id: playlist?.id
                })

                expect(statusCode).toBe(400);
            });
        });

        describe("given a user is not premium", () => {
            describe("given a song length longer than 10 minutes", () => {
                it("should return a 400 response", async () => {
                    extraParams.mocks.handleSearch(SONG_PAYLOADS.INVALID_NON_PREMIUM_MOCK_RETURN);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const { statusCode } = await supertest(app)
                    .post(`${baseEndpoint}/songs`)
                    .set(authPayload.header)
                    .send({
                        ...SONG_PAYLOADS.VALID_CREATE,
                        playlist_id: playlist?.id
                    })

                    expect(statusCode).toBe(400);
                });
            });

            describe("given a song length is 10 minutes or less", () => {
                it("should return a 200 response", async () => {
                    extraParams.mocks.handleSearch(SONG_PAYLOADS.VALID_NON_PREMIUM_MOCK_RETURN);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const { statusCode } = await supertest(app)
                    .post(`${baseEndpoint}/songs`)
                    .set(authPayload.header)
                    .send({
                        ...SONG_PAYLOADS.VALID_CREATE,
                        playlist_id: playlist?.id
                    })

                    expect(statusCode).toBe(200);
                });
            });
        });
    });
};

export default postRoute;