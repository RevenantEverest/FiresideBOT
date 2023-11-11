import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildPlaylistRoleExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist, GuildPlaylistRole } from '@@entities/index.js';
import * as PAYLOADS from '@@tests/support/payloads/guildPlaylistRoles.payloads.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistRoleExtraParams<GuildPlaylist>) {

    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(GuildPlaylist);
        const pEntity = pRepository.create({
            guild_id: extraParams.guildId as string,
            name: "GPR_Test"
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildPlaylistRole).remove(extraParams.entity as GuildPlaylistRole);

        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(GuildPlaylist).remove(extraParams.supportEntities[0] as GuildPlaylist);
        }
    });

    authenticatedRouteTest(app, "post", baseEndpoint);

    describe("given the user is logged in", () => {
        describe("given the user is a guild admin", () => {
            describe("given the role id doesn't already exist", () => {
                it("should return a 200 status and the playlist role", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
                    const { body, statusCode } = await supertest(app)
                    .post(endpoint)
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
                            id: extraParams.supportEntities![0].id,
                            guild_id: extraParams.guildId,
                            name: results.playlist.name,
                            created_at: results.playlist.created_at,
                            updated_at: results.playlist.updated_at
                        },
                        role_id: PAYLOADS.VALID_CREATE.role_id,
                        created_at: results.created_at
                    });

                    extraParams.entity = results;
                });
            });

            describe("given the role id already exists", () => {
                it("should return a 400 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(400)
                });
            });

            describe("given missing request body", () => {
                it("should return a 400 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(400)
                });
            });
        });

        describe("given the user is not a guild admin", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
                await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send()
                .expect(403)
            });
        });

        describe("given the user is not a guild member", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(false);

                const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
                await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send()
                .expect(403)
            });
        });
    });
};

export default postRoute;