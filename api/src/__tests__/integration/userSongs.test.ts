import supertest from 'supertest';

import AppDataSource from '../../db/dataSource.js';
import initializeApp from '../../app.js';
import UserSong from '../../entities/UserSong.js';

import issueToken from '../support/login.support.js';
import { connectToTestingDatabase } from '../support/database.support.js';
import { DB_TIMEOUT } from '../support/constants/database.js';

import * as PAYLOADS from '../support/payloads/userSongs.payloads.js';
import * as AUTH_PAYLOADS from '../support/payloads/auth.payloads.js';

import { youtube } from '../../utils/index.js';

import { SongInfo } from '../../types/youtube.js';
import { HandleReturn } from '../../types/promises.js';

type HandleSearchReturn = Promise<HandleReturn<SongInfo>>;

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/user";

let createdSong: UserSong;

describe("user songs", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /*
    
        POST
    
    */
    describe("create user song route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                await supertest(app)
                .post(`${baseEndpoint}/songs`)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given an incorrect playlist id", () => {
                it("should return a 404 status", async () => {
                    await supertest(app)
                    .post(`${baseEndpoint}/songs`)
                    .set(authPayload.header)
                    .send(PAYLOADS.INVALID)
                    .expect(404)
                });
            });

            describe("given the correct payload", () => {
                it("should return a 200 status and the user song", async () => {
                    const handleSearchMock = jest.spyOn(youtube, 'handleSearch');
                    handleSearchMock.mockImplementation(async (): HandleSearchReturn => ([PAYLOADS.MOCK_RETURN, undefined]));

                    const { body, statusCode } = await supertest(app)
                    .post(`${baseEndpoint}/songs`)
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
                            id: PAYLOADS.VALID_CREATE.playlist_id
                        },
                        title: PAYLOADS.MOCK_RETURN.title,
                        author: PAYLOADS.MOCK_RETURN.author,
                        video_id: PAYLOADS.MOCK_RETURN.videoId,
                        duration: PAYLOADS.MOCK_RETURN.duration,
                        thumbnail_url: PAYLOADS.MOCK_RETURN.thumbnail_url,
                        created_at: results.created_at
                    });

                    createdSong = results;
                });
            });

            describe("given a duplicate song", () => {
                it("should return a 400 response", async () => {
                    const handleSearchMock = jest.spyOn(youtube, 'handleSearch');
                    handleSearchMock.mockImplementation(async (): HandleSearchReturn => ([PAYLOADS.MOCK_RETURN, undefined]));

                    const { statusCode } = await supertest(app)
                    .post(`${baseEndpoint}/songs`)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)

                    expect(statusCode).toBe(400);
                });
            });

            describe("given a user is not premium", () => {
                describe("given a song length longer than 10 minutes", () => {
                    it("should return a 400 response", async () => {
                        const handleSearchMock = jest.spyOn(youtube, 'handleSearch');
                        handleSearchMock.mockImplementation(async (): HandleSearchReturn => ([
                            PAYLOADS.INVALID_NON_PREMIUM_MOCK_RETURN,
                            undefined
                        ]));

                        const { statusCode } = await supertest(app)
                        .post(`${baseEndpoint}/songs`)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_CREATE)

                        expect(statusCode).toBe(400);
                    });
                });

                describe("given a song length is 10 minutes or less", () => {
                    it("should return a 200 response", async () => {
                        const handleSearchMock = jest.spyOn(youtube, 'handleSearch');
                        handleSearchMock.mockImplementation(async (): HandleSearchReturn => ([
                            PAYLOADS.VALID_NON_PREMIUM_MOCK_RETURN,
                            undefined
                        ]));

                        const { statusCode } = await supertest(app)
                        .post(`${baseEndpoint}/songs`)
                        .set(authPayload.header)
                        .send(PAYLOADS.VALID_CREATE)

                        expect(statusCode).toBe(200);
                    });
                });
            });
        });
    });

    /*
    
        GET
    
    */
    describe("get user song route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403 status", async () => {
                await supertest(app)
                .get(`${baseEndpoint}/songs`)
                .expect(403)
            });
        });

        describe("given the user is logged in", () => {
            describe("given the playlist id as a param", () => {
                describe("given the song id doesn't exist", () => {
                    it("should return 404", async () => {
                        const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                        const songId = 97647389;
                        const endpoint = `${baseEndpoint}/id/${playlistId}/songs/id/${songId}`;
                        await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()
                        .expect(404)
                    });
                });

                describe("given the correct song id as a param", () => {
                    it("should return the song", async () => {
                        const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                        const songId = createdSong.id;
                        const endpoint = `${baseEndpoint}/id/${playlistId}/songs/id/${songId}`;
                        const { body, statusCode } = await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()

                        expect(statusCode).toBe(200);

                        const { results } = body;

                        expect(results).toEqual({
                            id: createdSong.id,
                            title: createdSong.title,
                            author: createdSong.author,
                            video_id: createdSong.video_id,
                            duration: createdSong.duration,
                            thumbnail_url: createdSong.thumbnail_url,
                            created_at: createdSong.created_at
                        });
                    });
                });

                it("should return paginated songs", async () => {
                    const playlistId = PAYLOADS.VALID_CREATE.playlist_id;
                    const endpoint = `${baseEndpoint}/id/${playlistId}/songs`;
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

                    expect(results[0]).toEqual({
                        id: createdSong.id,
                        title: createdSong.title,
                        author: createdSong.author,
                        video_id: createdSong.video_id,
                        duration: createdSong.duration,
                        thumbnail_url: createdSong.thumbnail_url,
                        created_at: createdSong.created_at
                    });
                });
            });
        });
    });

    /*
    
        DELETE
    
    */
    describe("delete user song route", () => {

    });
});