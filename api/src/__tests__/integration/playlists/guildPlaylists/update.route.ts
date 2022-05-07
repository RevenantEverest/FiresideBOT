import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildPlaylists.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistExtraParams } from '../../../support/types/extraParams.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
            await supertest(app)
            .put(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the playlist name contains whitepsace", () => {
            it("should return a 400 status", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
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

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
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
                        id: extraParams.createdPlaylist?.id,
                        guild_id: extraParams.guildId,
                        name: PAYLOADS.VALID_UPDATE.name,
                        created_at: extraParams.createdPlaylist?.created_at,
                        updated_at: results.updated_at
                    });

                    extraParams.createdPlaylist = results;
                });
            });
            
            describe("given the user is not a guild admin", () => {
                it("should return a 403 status", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
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

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/${extraParams.createdPlaylist?.id}`;
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