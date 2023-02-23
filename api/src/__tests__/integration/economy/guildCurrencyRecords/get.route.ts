import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildCurrencyRecordExtraParams } from '../../../support/types/extraParams/guildCurrencyRecord.params.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildCurrencyRecordExtraParams) {

};

export default getRoute;