import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { FortuneExtraParams } from '../../../support/types/extraParams/index.js';

function destroyRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: FortuneExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}/id/${extraParams.createdFortune?.id}`;
            await supertest(app)
            .delete(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is not a guild admin", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}/id/${extraParams.createdFortune?.id}`;
                await supertest(app)
                .delete(endpoint)
                .set(authPayload.header)
                .send()
                .expect(403)
            });
        });

        describe("given the user is a guild admin", () => {
            it("should return a 200 status", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}/id/${extraParams.createdFortune?.id}`;
                await supertest(app)
                .delete(endpoint)
                .set(authPayload.header)
                .send()
                .expect(200)
            });
        });
    });
};

export default destroyRoute;