import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildSong.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSongExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/songs`)
            .expect(403)

            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/id/1/songs`)
            .expect(403)

            await supertest(app)
            .get(`${baseEndpoint}/${extraParams.guildId}/id/1/songs/id/1`)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the playlist id as a param", () => {
            
            
            describe("given the song id as a param", () => {

            });
        });
    });
};

export default getRoute;