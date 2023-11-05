import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildPlaylistExtraParams } from '@@tests/support/types/extraParams.js';

import * as PAYLOADS from '@@tests/support/payloads/guildPlaylists.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistExtraParams) {

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

    authenticatedRouteTest(app, "put", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`)

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitespace", () => {
            it("should return a 400 status", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                await supertest(app)
                .put(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.INVALID)
                .expect(400)
            });
        });

        describe("given the correct payload", () => {
            describe("given the user is a guild admin", () => {
                it("should return a 200 status and the playlist", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .put(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_UPDATE)

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    expect(results).toEqual({
                        id: extraParams.entity?.id,
                        guild_id: extraParams.guildId,
                        name: PAYLOADS.VALID_UPDATE.name,
                        created_at: results.created_at,
                        updated_at: results.updated_at
                    });

                    extraParams.entity = results;
                });
            });
            
            describe("given the user is not a guild admin", () => {
                it("should return a 403 status", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                    await supertest(app)
                    .put(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_UPDATE)
                    .expect(403)
                });
            });

            describe("given the user is not a guild member", () => {
                it("should return a 403 status", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                    await supertest(app)
                    .put(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_UPDATE)
                    .expect(403)
                });
            });
        });
    });
};

export default updateRoute;