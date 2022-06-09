import supertest from 'supertest';
import { Application } from 'express';

import * as PAYLOADS from '../../../support/payloads/guildPlaylistRoles.payloads.js';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistRoleExtraParams } from '../../../support/types/extraParams/index.js';

function deleteRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistRoleExtraParams) {

};

export default deleteRoute;