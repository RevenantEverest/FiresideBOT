import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { FortuneExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { Fortune } from '@@entities/index.js';
import * as PAYLOADS from '@@tests/support/payloads/fortune.payloads.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: FortuneExtraParams) {
    
    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(Fortune).remove(extraParams.entity as Fortune);
    });

    authenticatedRouteTest(app, "post", baseEndpoint);

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

                extraParams.entity = results;
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