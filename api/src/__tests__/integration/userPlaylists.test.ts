import { createConnection, getConnection } from 'typeorm';
import supertest from 'supertest';

import initializeApp from '../../app.js';
import waitForPostgres from '../../db/waitForPostgres.js';
import issueToken from '../support/login.support.js';
import dbConfig from '../support/dbConfig.support.js';
import UserPlaylist from '../../entities/UserPlaylist.js';

const authPayload = issueToken();
const authHeader = {
    "Authorization": `Bearer ${authPayload.token}`
};

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const invalidPayload = {
    name: "Hello World"
};

const validCreatePayload = {
    name: "MyPlaylist"
};

const validUpdatePayload = {
    name: "MyNewPlaylist"
};

let createdPlaylist: UserPlaylist;

describe("user playlists", () => {

    beforeAll(async () => {
        await waitForPostgres(createConnection, dbConfig);
    }, 5 * 5000);

    afterAll(() => {
        const connection = getConnection();
        connection.close();
    });

    /*

        POST

    */
    describe("create user playlist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                await supertest(app)
                .post(baseEndpoint)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given the playlist name contains whitespace", () => {
                it("should return a 400 status", async () => {
                    await supertest(app)
                    .post(baseEndpoint)
                    .set(authHeader)
                    .send(invalidPayload)
                    .expect(400)
                });
            });

            describe("given the correct payload", () => {
                describe("given the playlist name doesn't exist", () => {
                    it("should return a 200 status and the user playlist", async () => {
                        const { body, statusCode } = await supertest(app)
                        .post(baseEndpoint)
                        .set(authHeader)
                        .send(validCreatePayload)
        
                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBeNull();
        
                        const { results } = body;
        
                        expect(results.id).not.toBeNull();
                        expect(results.created_at).not.toBeNull();
                        expect(results.updated_at).not.toBeNull();
        
                        expect(results).toEqual({
                            id: results.id,
                            discord_id: authPayload.discord_id,
                            name: validCreatePayload.name,
                            created_at: results.created_at,
                            updated_at: results.updated_at
                        });
    
                        createdPlaylist = results;
                    });
                });

                describe("given the playlist name already exists", () => {
                    it("should return a 400 status", async () => {
                        await supertest(app)
                        .post(baseEndpoint)
                        .set(authHeader)
                        .send(validCreatePayload)
                        .expect(400);
                    });
                });
            });
        });
    });

    /*

        UPDATE

    */
    describe("update user playlist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                const apiEndpoint = `${baseEndpoint}/id/${createdPlaylist.id}`;
                await supertest(app)
                .put(apiEndpoint)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given the playlist name contains whitespace", () => {
                it("should return a 400 status", async () => {
                    const apiEndpoint = `${baseEndpoint}/id/${createdPlaylist.id}`;
                    await supertest(app)
                    .put(apiEndpoint)
                    .set(authHeader)
                    .send(invalidPayload)
                    .expect(400)
                });
            });

            describe("given the playlist name already exists", () => {
                it("should return a 400 status", async () => {
                    const apiEndpoint = `${baseEndpoint}/id/${createdPlaylist.id}`;
                    await supertest(app)
                    .put(apiEndpoint)
                    .set(authHeader)
                    .send(validCreatePayload)
                    .expect(400)
                });
            });

            describe("given the correct payload", () => {
                it("should return a 200 status and the playlist", async () => {
                    const apiEndpoint = `${baseEndpoint}/id/${createdPlaylist.id}`;
                    const { body, statusCode } = await supertest(app)
                    .put(apiEndpoint)
                    .set(authHeader)
                    .send(validUpdatePayload)

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    expect(results).toEqual({
                        id: createdPlaylist.id,
                        discord_id: authPayload.discord_id,
                        name: validUpdatePayload.name,
                        created_at: createdPlaylist.created_at,
                        updated_at: results.updated_at
                    });

                    createdPlaylist = results;
                });
            });
        });
    });


    /*
    
        GET

    */
    describe("get user playlist route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                await supertest(app)
                .get(baseEndpoint)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given the id as a param", () => {
                describe("given the id doesn't exist", () => {
                    it("should return 404", async () => {
                        const apiEndpoint = `${baseEndpoint}/id/123123`;
                        await supertest(app)
                        .get(apiEndpoint)
                        .set(authHeader)
                        .send()
                        .expect(404)
                    });
                });
    
                describe("given the id does exist", () => {
                    it("should return the playlist", async () => {
                        const apiEndpoint = `${baseEndpoint}/id/1`;
                        const { body, statusCode } = await supertest(app)
                        .get(apiEndpoint)
                        .set(authHeader)
                        .send()
        
                        expect(statusCode).toBe(200);
        
                        const { results } = body;
        
                        expect(results.id).not.toBeNull();
                        expect(results.created_at).not.toBeNull();
                        expect(results.updated_at).not.toBeNull();
        
                        expect(results).toEqual({
                            id: createdPlaylist.id,
                            discord_id: authPayload.discord_id,
                            name: createdPlaylist.name,
                            created_at: createdPlaylist.created_at,
                            updated_at: results.updated_at,
                            songs: []
                        });
                    });
                });
            });
    
            describe("given discord id as a param", () => {
                describe("given the discord id isn't the requester's discord id", () => {
                    it("should return a 403", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/123456789123456789`;
                        await supertest(app)
                        .get(apiEndpoint)
                        .set(authHeader)
                        .send()
                        .expect(403);
                    });
                });
    
                describe("given the discord id does exist", () => {
                    it("should return paginated playlists", async () => {
                        const apiEndpoint = `${baseEndpoint}/discord_id/${authPayload.discord_id}`;
                        const { body, statusCode } = await supertest(app)
                        .get(apiEndpoint)
                        .set(authHeader)
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
                            results: [
                                {
                                    id: createdPlaylist.id,
                                    discord_id: authPayload.discord_id,
                                    name: createdPlaylist.name,
                                    created_at: createdPlaylist.created_at,
                                    updated_at: results[0].updated_at
                                }
                            ]
                        });
                    });
                });
            });
        });
    });
});
