import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildSongExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/guildPlaylists.payloads.js';
import * as SONG_PAYLOADS from '@@tests/support/payloads/guildSong.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist, GuildSong } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams<GuildPlaylist>) {

    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(GuildPlaylist);
        const pEntity = pRepository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            guild_id: extraParams.guildId as string
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildSong).remove(extraParams.entity as GuildSong);

        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(GuildPlaylist).remove(extraParams.supportEntities[0] as GuildPlaylist);
        }
    });

    authenticatedRouteTest(app, "post", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/songs`);

    describe("given the user is logged in", () => {
        describe("given an incorrect playlist id", () => {
            it("should return a 404 status", async () => {
                extraParams.mocks.hasPermission(true);
                
                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/12349/songs`)
                .set(authPayload.header)
                .send(SONG_PAYLOADS.INVALID)
                .expect(404)
            });
        });

        describe("given the user is not a guild admin or has proper guild playlist roles", () => {
            it("should return a 401 response", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.hasRole(false);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];

                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`)
                .set(authPayload.header)
                .send(SONG_PAYLOADS.VALID_CREATE)
                .expect(401)
            });
        });

        describe("given the correct payload and user is not a guild admin but has a guild playlist role", () => {
            it("should return a 200 and the guild song", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.hasRole(true);
                extraParams.mocks.handleSearch(SONG_PAYLOADS.MOCK_RETURN);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const { body, statusCode } = await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`)
                .set(authPayload.header)
                .send(SONG_PAYLOADS.VALID_CREATE)

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
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.handleSearch(SONG_PAYLOADS.MOCK_RETURN);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];

                await supertest(app)
                .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`)
                .set(authPayload.header)
                .send(SONG_PAYLOADS.VALID_CREATE)
                .expect(400)
            });
        });

        describe("given a user is not premium", () => {
            describe("given a song length longer than 10 minutes", () => {
                it("should return a 400 response", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.handleSearch(SONG_PAYLOADS.INVALID_NON_PREMIUM_MOCK_RETURN);
                
                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];

                    await supertest(app)
                    .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`)
                    .set(authPayload.header)
                    .send(SONG_PAYLOADS.VALID_CREATE)
                    .expect(400)
                });
            });

            describe("given a song length is 10 minutes or less", () => {
                it("should return a 200 response", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.handleSearch(SONG_PAYLOADS.VALID_NON_PREMIUM_MOCK_RETURN);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];

                    await supertest(app)
                    .post(`${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`)
                    .set(authPayload.header)
                    .send(SONG_PAYLOADS.VALID_CREATE)
                    .expect(200)
                });
            });
        });
    });
};

export default postRoute;