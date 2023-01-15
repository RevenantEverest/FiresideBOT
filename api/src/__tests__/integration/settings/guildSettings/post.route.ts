import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSettingsExtraParams } from '../../../support/types/extraParams/index.js';
import { DEFAULTS } from '../../../../constants/index.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSettingsExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 401 status", async () => {
            await supertest(app)
            .post(`${baseEndpoint}/${extraParams.guildId}`)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is not a guild admin", () => {
            it("should return a 200 status and the guild settings", async () => {
                /* Allows any non guild member to create guild settings if they don't exist */
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.altGuildId}`;
                const { body, statusCode } = await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send()

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: results.id,
                    guild_id: extraParams.altGuildId,
                    prefix: DEFAULTS.GENERAL_SETTINGS.PREFIX,
                    volume: DEFAULTS.GENERAL_SETTINGS.VOLUME,
                    rank_increase_rate: DEFAULTS.RANK_SETTINGS.GENERAL_INCREASE_RATE,
                    rank_complexity: DEFAULTS.RANK_SETTINGS.COMPLEXITY,
                    rank_channel: null,
                    currency_name: DEFAULTS.ECONOMY_SETTINGS.CURRENCY_NAME,
                    currency_increase_rate: DEFAULTS.ECONOMY_SETTINGS.INCREASE_RATE,
                    updated_at: results.updated_at
                });

                /* Don't set extraParams.guildSettings for altGuildId */
            });
        });

        describe("given the user is a guild admin", () => {
            it("should save default settings, return a 200 status and the guild settings", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                const { body, statusCode } = await supertest(app)
                .post(endpoint)
                .set(authPayload.header)
                .send()

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: results.id,
                    guild_id: extraParams.altGuildId,
                    prefix: DEFAULTS.GENERAL_SETTINGS.PREFIX,
                    volume: DEFAULTS.GENERAL_SETTINGS.VOLUME,
                    rank_increase_rate: DEFAULTS.RANK_SETTINGS.GENERAL_INCREASE_RATE,
                    rank_complexity: DEFAULTS.RANK_SETTINGS.COMPLEXITY,
                    rank_channel: null,
                    currency_name: DEFAULTS.ECONOMY_SETTINGS.CURRENCY_NAME,
                    currency_increase_rate: DEFAULTS.ECONOMY_SETTINGS.INCREASE_RATE,
                    updated_at: results.updated_at
                });

                extraParams.guildSettings = results;
            });
        });
    });
};

export default postRoute;