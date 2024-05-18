import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildCurrencyRecordExtraParams } from '@@tests/support/types/extraParams.js';

import * as PAYLOADS from '@@tests/support/payloads/guildCurrencyRecord.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildCurrencyRecord } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function updateRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildCurrencyRecordExtraParams) {

    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(GuildCurrencyRecord);
        const entity = repository.create({
            ...PAYLOADS.VALID_CREATE,
            discord_id: authPayload.discord_id as string,
            guild_id: extraParams.guildId as string
        });

        const record = await entity.save();
        extraParams.entity = record;
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildCurrencyRecord).remove(extraParams.entity as GuildCurrencyRecord);
    });

    authenticatedRouteTest(app, "put", `${baseEndpoint}/guild_id/${extraParams.guildId}/discord_id/${authPayload.discord_id}`);

    describe("given the user is logged in", () => {
        describe("given the user's auth permission is USER and tries to update their own record", () => {
            it("should return a 400 status", async () => {
                const apiEndpoint = `${baseEndpoint}/guild/id/${extraParams.guildId}/discord_id/${authPayload.discord_id}`;
                await supertest(app)
                .put(apiEndpoint)
                .set(authPayload.header)
                .send(PAYLOADS.VALID_CREATE)
                .expect(400)
            });
        });
    });
};

export default updateRoute;