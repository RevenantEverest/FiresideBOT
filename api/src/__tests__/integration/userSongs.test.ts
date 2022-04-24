import { createConnection, getConnection } from 'typeorm';
import supertest from 'supertest';

import initializeApp from '../../app.js';
import waitForPostgres from '../../db/waitForPostgres.js';
import issueToken from '../support/login.support.js';
import dbConfig from '../support/dbConfig.support.js';
import { SongInfo } from '../../types/youtube.js';
import { youtube } from '../../utils/index.js';
import { HandleReturn } from 'src/types/promises.js';

type HandleSearchReturn = Promise<HandleReturn<SongInfo>>;

const authPayload = issueToken();
const authHeader = {
    "Authorization": `Bearer ${authPayload.token}`
};

const app = initializeApp();
const baseEndpoint = "/playlists/user";

const invalidPayload = {
    playlist_id: 99875,
    request: "fake request"
};

const validCreatePayload = {
    playlist_id: 1,
    request: "test request"
};

const validUpdatePayload = {

};

const returnPayload: SongInfo = {
    title: "TestTrack",
    videoId: "d7hGaK98sHH",
    author: "Jest",
    duration: 123,
    thumbnail_url: "thumbnail_image"
};

describe("user songs", () => {

    beforeAll(async () => {
        await waitForPostgres(createConnection, dbConfig);
    }, 5 * 5000);

    afterAll(() => {
        const connection = getConnection();
        connection.close();
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const handleSearchMock = jest.spyOn(youtube, 'handleSearch');
        handleSearchMock.mockImplementation(async (): HandleSearchReturn => ([returnPayload, undefined]));
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
                    .set(authHeader)
                    .send(invalidPayload)
                    .expect(404)
                });
            });

            describe("given the correct payload", () => {
                it("should return a 200 status and the user song", async () => {
                    const { body, statusCode } = await supertest(app)
                    .post(`${baseEndpoint}/songs`)
                    .set(authHeader)
                    .send(validCreatePayload)

                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBe(null);

                    const { results } = body;

                    expect(results.id).not.toBe(null);
                    expect(results.created_at).not.toBe(null);

                    expect(results).toEqual({
                        id: results.id,
                        playlist: {
                            id: validCreatePayload.playlist_id
                        },
                        title: returnPayload.title,
                        author: returnPayload.author,
                        video_id: returnPayload.videoId,
                        duration: returnPayload.duration,
                        thumbnail_url: returnPayload.thumbnail_url,
                        created_at: results.created_at
                    });
                });
            });
        });
    });

    /*
    
        GET
    
    */
    describe("get user song route", () => {
    
    });

    /*
    
        DELETE
    
    */
    describe("delete user song route", () => {

    });
});