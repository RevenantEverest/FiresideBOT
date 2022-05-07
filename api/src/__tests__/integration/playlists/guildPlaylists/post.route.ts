import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildPlaylists.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistExtraParams } from '../../../support/types/extraParams.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .post(baseEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is a guild admin", () => {
            describe("given the playlist name contains whitespace", () => {
                it("should return a 400 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.INVALID)
                    .expect(400)
                });
            });

            describe("given the correct payload", () => {
                describe("given the playlist name doesn't exist", () => {
                    it("should return a 200 status and the guild playlist", async () => {
                        extraParams.mocks.hasPermission(true);
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                        const { body, statusCode } = await supertest(app)
                        .post(endpoint)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_CREATE)

                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBeNull();

                        const { results } = body;

                        expect(results.id).not.toBeNull();
                        expect(results.created_at).not.toBeNull();
                        expect(results.updated_at).not.toBeNull();

                        expect(results).toEqual({
                            id: results.id,
                            guild_id: extraParams.guildId,
                            name: PAYLOADS.VALID_CREATE.name,
                            created_at: results.created_at,
                            updated_at: results.updated_at
                        });

                        extraParams.createdPlaylist = results;
                    });
                });

                describe("given the playlist name already exists", () => {
                    it("should return a 400 status", async () => {
                        extraParams.mocks.hasPermission(true);
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                        await supertest(app)
                        .post(endpoint)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_CREATE)
                        .expect(400)
                    });
                });
            });
        });

        describe("given the user is not a guild admin", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(403)
            });
        });

        describe("given the user is not a guild member", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(false);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(403)
            });
        });
    });
};

export default postRoute;