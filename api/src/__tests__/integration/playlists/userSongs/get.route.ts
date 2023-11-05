import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { UserSongExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/userPlaylists.payloads.js';
import * as SONG_PAYLOADS from '@@tests/support/payloads/userSongs.payloads.js';
import * as AUTH_PAYLOADS from '@@tests/support/payloads/auth.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { UserPlaylist, UserSong } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';
import issueToken from '@@tests/support/login.support.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: UserSongExtraParams<UserPlaylist>) {

    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(UserPlaylist);
        const pEntity = pRepository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            is_public: false,
            discord_id: authPayload.discord_id
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];

        const repository = AppDataSource.getRepository(UserSong);
        const entity = repository.create({
            title: SONG_PAYLOADS.MOCK_RETURN.title,
            video_id: SONG_PAYLOADS.MOCK_RETURN.videoId,
            author: SONG_PAYLOADS.MOCK_RETURN.author,
            duration: SONG_PAYLOADS.MOCK_RETURN.duration,
            thumbnail_url: SONG_PAYLOADS.MOCK_RETURN.thumbnail_url,
            playlist: pEntity
        });
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(UserSong).remove(extraParams.entity as UserSong);

        if(extraParams.supportEntities) {
            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
            await AppDataSource.getRepository(UserPlaylist).remove(playlist as UserPlaylist);
        }
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/songs`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/songs`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/songs/id/${extraParams.entity?.id}`);

    describe("given the user is logged in", () => {
        describe("given the playlist id as a param", () => {
            describe("given the song id doesn't exist", () => {
                it("should return 404", async () => {
                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const songId = 97647389;
                    const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs/id/${songId}`;
                    await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404)
                });
            });

            describe("given the correct song id as a param", () => {
                it("should return the song", async () => {
                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const song = extraParams.entity;
                    const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs/id/${song?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results).toEqual({
                        id: extraParams.entity?.id,
                        title: extraParams.entity?.title,
                        author: extraParams.entity?.author,
                        video_id: extraParams.entity?.video_id,
                        duration: extraParams.entity?.duration,
                        thumbnail_url: extraParams.entity?.thumbnail_url,
                        created_at: results.created_at
                    });
                });
            });
        });

        describe("given the authenticated user is the playlist owner", () => {
            /*
                Since the authenticated user is the playlist owner is_public doesn't apply
            */
            it("should return paginated songs", async () => {
                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs`;
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
                    id: extraParams.entity?.id,
                    title: extraParams.entity?.title,
                    author: extraParams.entity?.author,
                    video_id: extraParams.entity?.video_id,
                    duration: extraParams.entity?.duration,
                    thumbnail_url: extraParams.entity?.thumbnail_url,
                    created_at: results[0].created_at
                });
            });
        });

        describe("given the authenticated user is not the playlist owner", () => {
            describe("given the playlist is private", () => {
                it("should return a 400 status", async () => {
                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs`;
                    
                    const nonOwnerAuth: AuthTestingPayload = issueToken(AUTH_PAYLOADS.ALT);

                    await supertest(app)
                    .get(endpoint)
                    .set(nonOwnerAuth.header)
                    .expect(400)
                });
            });

            describe("given the playlist is public", () => {
                it("should return paginated songs", async () => {
                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs`;
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
                        id: extraParams.entity?.id,
                        title: extraParams.entity?.title,
                        author: extraParams.entity?.author,
                        video_id: extraParams.entity?.video_id,
                        duration: extraParams.entity?.duration,
                        thumbnail_url: extraParams.entity?.thumbnail_url,
                        created_at: results[0].created_at
                    });
                });
            });
        });

        it("should return paginated songs", async () => {
            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
            const endpoint = `${baseEndpoint}/id/${playlist?.id}/songs`;
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
                id: extraParams.entity?.id,
                title: extraParams.entity?.title,
                author: extraParams.entity?.author,
                video_id: extraParams.entity?.video_id,
                duration: extraParams.entity?.duration,
                thumbnail_url: extraParams.entity?.thumbnail_url,
                created_at: results[0].created_at
            });
        });
    });
};

export default getRoute;