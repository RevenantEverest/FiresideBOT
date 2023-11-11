import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildSettingsExtraParams } from '@@tests/support/types/extraParams.js';

import * as PAYLOADS from '@@tests/support/payloads/guildSettings.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildSettings } from '@@entities/index.js';
import { DEFAULTS } from '@@constants/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest';

type ExtraParams = GuildSettingsExtraParams<undefined, { altGuildId: string }>;

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: ExtraParams) {
    
    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(GuildSettings);
        const entity = repository.create({
            guild_id: extraParams.guildId as string,
            ...DEFAULTS.GENERAL_SETTINGS,
            ...DEFAULTS.RANK_SETTINGS,
            ...DEFAULTS.ECONOMY_SETTINGS
        });

        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildSettings).remove(extraParams.entity as GuildSettings);
    });

    authenticatedRouteTest(app, "get", `${baseEndpoint}/${extraParams.guildId}`);

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
                    id: extraParams.entity?.id,
                    guild_id: extraParams.guildId,
                    prefix: PAYLOADS.VALID_UPDATE.prefix,
                    volume: PAYLOADS.VALID_UPDATE.volume,
                    rank_increase_rate: PAYLOADS.VALID_UPDATE.rank_increase_rate,
                    rank_complexity: PAYLOADS.VALID_UPDATE.rank_complexity,
                    rank_channel: null,
                    currency_name: PAYLOADS.VALID_UPDATE.currency_name,
                    currency_increase_rate: PAYLOADS.VALID_UPDATE.currency_increase_rate,
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });
            });
        });
    });
};

export default updateRoute;