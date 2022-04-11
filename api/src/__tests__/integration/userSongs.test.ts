import { createConnection, getConnection } from 'typeorm';
import supertest from 'supertest';

import initializeApp from '../../app.js';
import waitForPostgres from '../../db/waitForPostgres.js';
import issueToken from '../support/login.support.js';
import dbConfig from '../support/dbConfig.support.js';
import UserSong from '../../entities/UserSong.js';
import { SongInfo } from '../../types/youtube.js';

const authPayload = issueToken();
const authHeader = {
    "Authorization": `Bearer ${authPayload.token}`
};

const app = initializeApp();
const baseEndpoint = "/playlists/user/";

const invalidPayload = {
    playlist_id: 10,
    request: "fake request"
};

const validCreatePayload = {
    playlist_id: 1,
    request: "test request"
};

const validUpdatePayload = {

};

jest.mock('../../utils/youtube.js', () => ({
    handleSearch: jest.fn(() => {
        const returnPayload: SongInfo = {
            title: "TestTrack",
            videoId: "d7hGaK98sHH",
            author: "Jest",
            duration: 312,
            thumbnail_url: "thumbnail_image"
        };

        return [returnPayload, undefined];
    })
}));

describe("user songs", () => {

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
                    .post(baseEndpoint)
                    .set(authHeader)
                    .send(invalidPayload)
                    .expect(404)
                });
            });

            describe("given the correct payload", () => {
                it("should return a 200 status and the user song", async () => {

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