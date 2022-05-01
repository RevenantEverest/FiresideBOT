import supertest from 'supertest';

import AppDataSource from '../../db/dataSource.js';
import initializeApp from '../../app.js';
import GuildPlaylist from '../../entities/GuildPlaylist.js';

import issueToken from '../support/login.support.js';
import { connectToTestingDatabase } from '../support/database.support.js';
import { DB_TIMEOUT } from '../support/constants/database.js';

import * as PAYLOADS from '../support/payloads/guildPlaylists.payloads.js';
import * as AUTH_PAYLOADS from '../support/payloads/auth.payloads.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);

const app = initializeApp();
const baseEndpoint = "/playlists/guild";

let createdPlaylist: GuildPlaylist;

describe("guild playlists", () => {

    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
    });

    /*
    
        POST
    
    */
    describe("create guild playlist route", () => {
        it("should be a test", () => {
            expect(200).toBe(200);
        });
    });

    /*
    
        UPDATE
    
    */
    describe("update guild playlist route", () => {

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