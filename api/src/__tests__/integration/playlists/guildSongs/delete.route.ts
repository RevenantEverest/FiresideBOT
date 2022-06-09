import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildSong.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildSongExtraParams } from '../../../support/types/extraParams/index.js';

function deleteRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildSongExtraParams) {

};

export default deleteRoute;