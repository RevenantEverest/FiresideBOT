import supertest from 'supertest';

import AppDataSource from '../../db/dataSource.js';
import initializeApp from '../../app.js';
import GuildPlaylist from '../../entities/GuildPlaylist.js';

import issueToken from '../support/login.support.js';
import { connectToTestingDatabase } from '../support/database.support.js';
import { DATABASE, DISCORD } from '../support/constants/index.js';

import * as PAYLOADS from '../support/payloads/guildPlaylists.payloads.js';
import * as AUTH_PAYLOADS from '../support/payloads/auth.payloads.js';

import { discord } from '../../utils/index.js';
import { HandleReturn } from '../../types/promises.js';

type MockReturn = Promise<HandleReturn<boolean>>;

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/guild";
const guildId = DISCORD.TESTING_SERVER_ID;

let createdPlaylist: GuildPlaylist;

function hasPermissionMock(value: boolean) {
    const spy = jest.spyOn(discord, "checkMemberPermissions");
    spy.mockImplementation(async (): MockReturn => [value, undefined]);
};

function isGuildMemberMock(value: boolean) {
    const spy = jest.spyOn(discord, "isGuildMember");
    spy.mockImplementation(async (): MockReturn => [value, undefined]);
};

describe("guild playlists", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DATABASE.DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
    });

    /*
    
        POST
    
    */
    describe("create guild playlist route", () => {
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
                        hasPermissionMock(true);
                        isGuildMemberMock(true);

                        const endpoint = `${baseEndpoint}/${guildId}`
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
                            hasPermissionMock(true);
                            isGuildMemberMock(true);

                            const endpoint = `${baseEndpoint}/${guildId}`;
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
                                guild_id: guildId,
                                name: PAYLOADS.VALID_CREATE.name,
                                created_at: results.created_at,
                                updated_at: results.updated_at
                            });

                            createdPlaylist = results;
                        });
                    });

                    describe("given the playlist name already exists", () => {
                        it("should return a 400 status", async () => {
                            hasPermissionMock(true);
                            isGuildMemberMock(true);

                            const endpoint = `${baseEndpoint}/${guildId}`;
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
                    hasPermissionMock(false);
                    isGuildMemberMock(true);

                    const endpoint = `${baseEndpoint}/${guildId}`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(403)
                });
            });

            describe("given the user is not a guild member", () => {
                it("should return a 403 status", async () => {
                    hasPermissionMock(false);
                    isGuildMemberMock(false);

                    const endpoint = `${baseEndpoint}/${guildId}`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(403)
                });
            });
        });
    });

    /*
    
        UPDATE
    
    */
    describe("update guild playlist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                const endpoint = `${baseEndpoint}/${guildId}/id/${createdPlaylist.id}`;
                await supertest(app)
                .put(endpoint)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given the playlist name contains whitepsace", () => {
                it("should return a 400 status", async () => {
                    hasPermissionMock(true);
                    isGuildMemberMock(true);

                    const endpoint = `${baseEndpoint}/${guildId}/id/${createdPlaylist.id}`;
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
                        hasPermissionMock(true);
                        isGuildMemberMock(true);

                        const endpoint = `${baseEndpoint}/${guildId}/id/${createdPlaylist.id}`;
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
                            id: createdPlaylist.id,
                            guild_id: guildId,
                            name: PAYLOADS.VALID_UPDATE.name,
                            created_at: createdPlaylist.created_at,
                            updated_at: results.updated_at
                        });
    
                        createdPlaylist = results;
                    });
                });
                
                describe("given the user is not a guild admin", () => {
                    it("should return a 403 status", async () => {
                        hasPermissionMock(false);
                        isGuildMemberMock(true);

                        const endpoint = `${baseEndpoint}/${guildId}/id/${createdPlaylist.id}`;
                        await supertest(app)
                        .put(endpoint)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_UPDATE)
                        .expect(403)
                    });
                });

                describe("given the user is not a guild member", () => {
                    it("should return a 403 status", async () => {
                        hasPermissionMock(false);
                        isGuildMemberMock(true);

                        const endpoint = `${baseEndpoint}/${guildId}/id/${createdPlaylist.id}`;
                        await supertest(app)
                        .put(endpoint)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_UPDATE)
                        .expect(403)
                    });
                });
            });
        });
    });

    /*
    
        GET
    
    */
    describe("get guild playlist route", () => {

    });

    /*
    
        DELETE
    
    */
    describe("delete guild playlist route", () => {

    });
});