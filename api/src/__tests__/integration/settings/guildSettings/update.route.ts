import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildSettings.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSettingsExtraParams } from '../../../support/types/extraParams/index.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSettingsExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
            await supertest(app)
            .put(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is not a guild admin", () => {
            it("should return a 403 status", async () => {
                extraParams.mocks.hasPermission(false);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                await supertest(app)
                .put(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_UPDATE)
                .expect(403)
            });
        });

        describe("given the user is a guild admin", () => {
            it("should return a 200 status and the updated settings", async () => {
                extraParams.mocks.hasPermission(true);
                extraParams.mocks.isGuildMember(true);

                const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
                const { body, statusCode } = await supertest(app)
                .put(endpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_UPDATE)

                expect(statusCode).toBe(200);

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.guildSettings?.id,
                    guild_id: extraParams.guildId,
                    prefix: PAYLOADS.VALID_UPDATE.prefix,
                    volume: PAYLOADS.VALID_UPDATE.volume,
                    rank_increase_rate: PAYLOADS.VALID_UPDATE.rank_increase_rate,
                    rank_complexity: PAYLOADS.VALID_UPDATE.rank_complexity,
                    rank_channel: null,
                    currency_name: PAYLOADS.VALID_UPDATE.currency_name,
                    currency_increase_rate: PAYLOADS.VALID_UPDATE.currency_increase_rate,
                    updated_at: results.updated_at
                });
            });
        });
    });
};

export default updateRoute;