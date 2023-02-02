import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildPlaylistRoles.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistRoleExtraParams } from '../../../support/types/extraParams/index.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistRoleExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .post(baseEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is a guild admin", () => {
            describe("given the role id doesn't already exist", () => {
                it("should return a 200 status and the playlist role", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/roles`;
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
                            id: 1,
                            guild_id: extraParams.guildId,
                            name: results.playlist.name,
                            created_at: results.playlist.created_at,
                            updated_at: results.playlist.updated_at
                        },
                        role_id: PAYLOADS.VALID_CREATE.role_id,
                        created_at: results.created_at
                    });

                    extraParams.guildPlaylistRole = results;
                });
            });

            describe("given the role id already exists", () => {
                it("should return a 400 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/roles`;
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

                    const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/roles`;
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

                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/roles`;
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

                const endpoint = `${baseEndpoint}/guild_id/${extraParams.guildId}/id/1/roles`;
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