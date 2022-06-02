import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
            await supertest(app)
            .get(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the id as a param", () => {
            describe("given the id doesn't exist", () => {
                it("should return a 404 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/887263`;
                    await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404)
                });
            });

            describe("given the id does exist", () => {
                it("should return the playlist", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    expect(results).toEqual({
                        id: extraParams.createdPlaylist?.id,
                        guild_id: extraParams.guildId,
                        name: extraParams.createdPlaylist?.name,
                        created_at: extraParams.createdPlaylist?.created_at,
                        updated_at: extraParams.createdPlaylist?.updated_at,
                        songs: results.songs
                    });
                });
            });
        });

        describe("given just the guild id", () => {
            it("should return paginated playlists", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
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
                expect(results[0].updated_at).not.toBeNull();

                expect(body).toEqual({
                    count: body.count,
                    next: null,
                    previous: null,
                    results: [{
                        id: extraParams.createdPlaylist?.id,
                        guild_id: extraParams.guildId,
                        name: extraParams.createdPlaylist?.name,
                        created_at: extraParams.createdPlaylist?.created_at,
                        updated_at: results[0].updated_at
                    }]
                });
            });
        });
    });
};

export default getRoute;