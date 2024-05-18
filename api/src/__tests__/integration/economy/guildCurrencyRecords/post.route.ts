import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { GuildCurrencyRecordExtraParams } from '@@tests/support/types/extraParams.js';

import * as PAYLOADS from '@@tests/support/payloads/guildCurrencyRecord.payloads.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { GuildCurrencyRecord } from '@@entities/index.js';
import authenticatedRouteTest from '@@tests/support/common/authenticatedRouteTest.js';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildCurrencyRecordExtraParams) {
    
    /* Setup */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(GuildCurrencyRecord);
        const entity = repository.create({
            ...PAYLOADS.VALID_CREATE,
            discord_id: authPayload.discord_id,
            guild_id: extraParams.guildId as string
        });

        const record = await entity.save();
        extraParams.entity = record;
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(GuildCurrencyRecord).remove(extraParams.entity as GuildCurrencyRecord);
    });

    authenticatedRouteTest(app, "post", `${baseEndpoint}/guild_id/${extraParams.guildId}/discord_id/${authPayload.discord_id}`);
};

export default postRoute;