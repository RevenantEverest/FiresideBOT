import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { FortuneExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { Fortune } from '@@entities/index.js';
import * as PAYLOADS from '@@tests/support/payloads/fortune.payloads.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: FortuneExtraParams) {

    /* Setup DB Rows */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(Fortune);
        const entity = repository.create({
            ...PAYLOADS.VALID_CREATE,
            guild_id: extraParams.guildId as string,
            created_by: authPayload.discord_id
        });
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(Fortune).clear();
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/guild/${extraParams.guildId}`);

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
                        ...extraParams.entity,
                        guild_id: extraParams.guildId,
                        created_by: authPayload.discord_id,
                        created_at: results[0].created_at
                    }]
                });
            });

            describe("given the id as a param", () => {
                it("should return a 200 status and the fortune", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/guild/${extraParams.guildId}/id/${extraParams.entity?.id}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.created_at).not.toBeNull();

                    expect(results).toEqual({
                        ...extraParams.entity,
                        guild_id: extraParams.guildId,
                        created_by: authPayload.discord_id,
                        created_at: results.created_at
                    });
                });
            });
        });
    });
};

export default getRoute;