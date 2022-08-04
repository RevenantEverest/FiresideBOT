import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/fortune.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { FortuneExtraParams } from '../../../support/types/extraParams/index.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: FortuneExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)
            .post(baseEndpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is not a guild admin", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}`;
                await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(403);
            });
        });

        describe("given the user is a guild admin", () => {
            it("should return a 200 status and the fortune", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}`;
                const { body, statusCode } = await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                
                expect(results).toEqual({
                    id: results.id,
                    guild_id: extraParams.guildId,
                    fortune: PAYLOADS.VALID_CREATE.fortune,
                    created_by: authPayload.discord_id,
                    created_at: results.created_at
                });

                extraParams.createdFortune = results;
            });

            describe("given a duplicate fortune", () => {
                it("should return a 400 status", async () => {
                    extraParams.mocks.hasPermission(true);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}`;
                    await supertest(app)
                    .post(endpoint)
                    .set(authPayload.header)
                    .send(PAYLOADS.VALID_CREATE)
                    .expect(400)
                });
            });
        });
    });
};

export default postRoute;
