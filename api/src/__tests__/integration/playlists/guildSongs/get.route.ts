import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildSongExtraParams } from '@@tests/support/types/extraParams.js';

import * as PLAYLIST_PAYLOADS from '@@tests/support/payloads/guildPlaylists.payloads.js';
import * as SONG_PAYLOADS from '@@tests/support/payloads/guildSong.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist, GuildSong } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams<GuildPlaylist>) {
    
    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(GuildPlaylist);
        const pEntity = pRepository.create({
            ...PLAYLIST_PAYLOADS.VALID_CREATE,
            guild_id: extraParams.guildId as string
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];

        const repository = AppDataSource.getRepository(GuildSong);
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
        await AppDataSource.getRepository(GuildSong).remove(extraParams.entity as GuildSong);

        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(GuildPlaylist).remove(extraParams.supportEntities[0] as GuildPlaylist);        
        }
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/songs`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/songs`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/songs/id/1`);

    describe("given the user is logged in", () => {
        describe("given the user is a guild member", () => {
            describe("given the guild id and playlist id as a param", () => {
                describe("given the guild id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/guild_id/81726110987/id/1/songs`;
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

                        const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/81625/songs`;
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

                            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                            const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs/918273`;
                            await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .expect(404)
                        });
                    });

                    describe("given the song id exists", () => {
                        it("should return the guild song", async () => {
                            extraParams.mocks.isGuildMember(true);

                            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                            const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs/id/${extraParams.entity?.id}`;
                            const { body, statusCode } = await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .send()

                            expect(statusCode).toBe(200);
                            expect(body.results).not.toBeNull();

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

                it("should return paginated songs", async () => {
                    extraParams.mocks.isGuildMember(true);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/songs`;
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
    });
};

export default getRoute;