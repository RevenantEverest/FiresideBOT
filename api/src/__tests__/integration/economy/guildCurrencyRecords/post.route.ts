import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildCurrencyRecord.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildCurrencyRecordExtraParams } from '../../../support/types/extraParams/guildCurrencyRecord.params.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildCurrencyRecordExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .post(baseEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        
    });
};

export default postRoute;