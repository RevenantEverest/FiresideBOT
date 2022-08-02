import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSettingsExtraParams } from '../../../support/types/extraParams/index.js';
import { DEFAULTS } from '../../../../constants/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSettingsExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 401 status", async () => {
            const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
            await supertest(app)
            .get(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is not a guild member", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(false);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                await supertest(app)
                .get(endpoint)
                .set(authPayload.header)
                .send()
                .expect(403)
            });
        });

        describe("given the guild id as a param", () => {
            describe("given the guild id exists", () => {
                it("should return a 200 status and the guild settings", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);

                    const { results } = body;

                    expect(results.id).not.toBeNull();
                    expect(results.updated_at).not.toBeNull();

                    expect(results).toEqual({
                        id: results.id,
                        guild_id: extraParams.guildId,
                        prefix: DEFAULTS.GENERAL_SETTINGS.PREFIX,
                        volume: DEFAULTS.GENERAL_SETTINGS.VOLUME,
                        rank_increase_rate: DEFAULTS.RANK_SETTINGS.GENERAL_INCREASE_RATE,
                        rank_complexity: DEFAULTS.RANK_SETTINGS.COMPLEXITY,
                        rank_channel: null,
                        currency_name: DEFAULTS.ECONOMY_SETTINGS.CURRENCY_NAME,
                        currency_increase_rate: DEFAULTS.ECONOMY_SETTINGS.INCREASE_RATE,
                        updated_at: results.updated_at
                    });
                });
            });

            describe("given the guild id doesn't exist", () => {
                it("should return a 404 status", async () => {
                    extraParams.mocks.hasPermission(false);
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/192817263554637281`;
                    await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()
                    .expect(404)
                });
            });
        });
    });
};

export default getRoute;