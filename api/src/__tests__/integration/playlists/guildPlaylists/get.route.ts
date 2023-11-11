import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import * as PAYLOADS from '@@tests/support/payloads/guildPlaylists.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistExtraParams) {

    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(GuildPlaylist);
        const entity = repository.create({
            ...PAYLOADS.VALID_CREATE,
            guild_id: extraParams.guildId as string
        });

        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildPlaylist).remove(extraParams.entity as GuildPlaylist);
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}`);

    describe("given the user is logged in", () => {
        describe("given the id as a param", () => {
            describe("given the id doesn't exist", () => {
                it("should return a 404 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/887263`;
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

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    const { id, name } = extraParams.entity as GuildPlaylist;

                    expect(results).toEqual({
                        ...results,
                        id,
                        name,
                        guild_id: extraParams.guildId
                    });
                });
            });
        });

        describe("given just the guild id", () => {
            it("should return paginated playlists", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}`;
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
                expect(results[0].duration).not.toBeNull();
                expect(results[0].songCount).not.toBeNull();

                const { id, name } = extraParams.entity as GuildPlaylist;

                expect(body).toEqual({
                    count: body.count,
                    next: null,
                    previous: null,
                    results: [{
                        ...results[0],
                        id, 
                        name,
                        guild_id: extraParams.guildId
                    }]
                });
            });
        });

        describe("given the guild id and playlist name as a param", () => {
            describe("given the playlist name doesn't exist", () => {
                it("should return a 404 status", async () => {
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/name/asdfasdfasdfasdf`;
                    await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .expect(404)
                });
            });

            describe("given the playlist name does exist", () => {
                it("should return a 200 status and the playlist", async () => {
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/name/${extraParams.entity?.name}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    const { id, name } = extraParams.entity as GuildPlaylist;

                    expect(results).toEqual({
                        ...results,
                        id,
                        name,
                        guild_id: extraParams.guildId
                    });
                });
            });
        });
    });
};

export default getRoute;