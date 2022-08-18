import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { FortuneExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: FortuneExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}`;
            await supertest(app)
            .get(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the guild id as a param", () => {
            it("should return a 200 status and paginated fortunes", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);
            
                const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}`;
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

                expect(body).toEqual({
                    count: body.count,
                    next: null,
                    previous: null,
                    results: [{
                        id: extraParams.createdFortune?.id,
                        guild_id: extraParams.guildId,
                        fortune: extraParams.createdFortune?.fortune,
                        created_by: authPayload.discord_id,
                        created_at: extraParams.createdFortune?.created_at,
                    }]
                });
            });

            describe("given the id as a param", () => {
                it("should return a 200 status and the fortune", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}/id/${extraParams.createdFortune?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();

                    expect(results).toEqual({
                        id: extraParams.createdFortune?.id,
                        guild_id: extraParams.guildId,
                        fortune: extraParams.createdFortune?.fortune,
                        created_by: authPayload.discord_id,
                        created_at: extraParams.createdFortune?.created_at,
                    });
                });
            });
        });
    });
};

export default getRoute;