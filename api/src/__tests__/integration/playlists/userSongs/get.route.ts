import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/userSongs.payloads.js';
import * as AUTH_PAYLOADS from '../../../support/payloads/auth.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { UserSongExtraParams } from '../../../support/types/extraParams/index.js';

import issueToken from '../../../support/login.support.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserSongExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .get(`${baseEndpoint}/songs`)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the playlist id as a param", () => {
            describe("given the song id doesn't exist", () => {
                it("should return 404", async () => {
                    const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                    const songId = 97647389;
                    const endpoint = `${baseEndpoint}/id/${playlistId}/songs/id/${songId}`;
                    await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404)
                });
            });

            describe("given the correct song id as a param", () => {
                it("should return the song", async () => {
                    const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                    const songId = extraParams.createdSong?.id;
                    const endpoint = `${baseEndpoint}/id/${playlistId}/songs/id/${songId}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

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

        describe("given the authenticated user is the playlist owner", () => {
            /*
                Since the authed user is the playlist owner is_public doesn't apply
            */
            it("should return paginated songs", async () => {
                const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                const endpoint = `${baseEndpoint}/id/${playlistId}/songs`;
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

        describe("given the authenticated user is not the playlist owner", () => {
            describe("given the playlist is private", () => {
                it("should return a 404 status", async () => {
                    

                    const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                    const endpoint = `${baseEndpoint}/id/${playlistId}/songs`;
                    
                    const nonOwnerAuth: AuthTestingPayload = issueToken(AUTH_PAYLOADS.ALT);
                    console.log("Check here...", nonOwnerAuth);

                    await supertest(app)
                    .get(endpoint)
                    .set(nonOwnerAuth.header)
                    .expect(400)
                });
            });

            describe("given the playlist is public", () => {
                it("should return paginated songs", async () => {
                    const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                    const endpoint = `${baseEndpoint}/id/${playlistId}/songs`;
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

        it("should return paginated songs", async () => {
            const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
            const endpoint = `${baseEndpoint}/id/${playlistId}/songs`;
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
};

export default getRoute;