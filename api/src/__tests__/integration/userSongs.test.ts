import { createConnection, getConnection } from 'typeorm';
import supertest from 'supertest';

import initializeApp from '../../app.js';
import waitForPostgres from '../../db/waitForPostgres.js';
import issueToken from '../support/login.support.js';
import dbConfig from '../support/dbConfig.support.js';
import UserSong from '../../entities/UserSong.js';

const authPayload = issueToken();
const authHeader = {
    "Authorization": `Bearer ${authPayload.token}`
};

const app = initializeApp();
const baseEndpoint = "/playlist/user/songs";

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

    it("fake test", () => {
        expect(200).toBe(200);
    });
});