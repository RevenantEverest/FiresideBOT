import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildPlaylistRoleExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildPlaylist, GuildPlaylistRole } from '@@entities/index.js';
import * as PAYLOADS from '@@tests/support/payloads/guildPlaylistRoles.payloads.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';


function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistRoleExtraParams<GuildPlaylist>) {

    /* Setup */
    beforeAll(async () => {
        const pRepository = AppDataSource.getRepository(GuildPlaylist);
        const pEntity = pRepository.create({
            guild_id: extraParams.guildId as string, // Arbitrary
            name: "GPR_Test"
        });

        const playlist = await pEntity.save();
        extraParams.supportEntities = [playlist];

        const repository = AppDataSource.getRepository(GuildPlaylistRole);
        const entity = repository.create({
            ...PAYLOADS.VALID_CREATE,
            playlist
        });
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildPlaylistRole).remove(extraParams.entity as GuildPlaylistRole);
        
        if(extraParams.supportEntities) {
            await AppDataSource.getRepository(GuildPlaylist).remove(extraParams.supportEntities[0] as GuildPlaylist);
        }
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/roles`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/roles`);
    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${extraParams.supportEntities && extraParams.supportEntities[0].id}/roles/id/${extraParams.entity?.id}`);

    describe("given the user is logged in", () => {
        describe("given the user is a guild member", () => {
            describe("given the guild id and playlist id as a param", () => {
                describe("given the guild id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/guild_id/9918726354123/id/1/roles`;
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

                describe("given the playlist id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/9981726/roles`;
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

                describe("given the role id as a param", () => {
                    describe("given the role id doesn't exist", () => {
                        it("should return a 404 status", async () => {
                            extraParams.mocks.isGuildMember(true);

                            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                            const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles/id/192888371621098762`;
                            await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .expect(404)
                        });
                    });

                    describe("given the role id exists", () => {
                        it("should return the guild playlist role", async () => {
                            extraParams.mocks.isGuildMember(true);

                            const { entity } = extraParams;
                            const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                            const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles/id/${entity?.role_id}`;
                            const { body, statusCode } = await supertest(app)
                            .get(endpoint)
                            .set(authPayload.header)
                            .send()

                            expect(statusCode).toBe(200);
                            expect(body.results).not.toBeNull();

                            const { results } = body;

                            expect(results).toEqual({
                                id: entity?.id,
                                role_id: entity?.role_id,
                                created_at: results?.created_at
                            })
                        });
                    });
                });

                it("should return a 200 status and paginated playlist roles", async () => {
                    extraParams.mocks.isGuildMember(true);

                    const playlist = extraParams.supportEntities && extraParams.supportEntities[0];
                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/${playlist?.id}/roles`;
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
                            id: extraParams.entity?.id,
                            role_id: extraParams.entity?.role_id,
                            created_at: results[0].created_at
                        }]
                    })
                });
            });
        });
    });
};

export default getRoute;