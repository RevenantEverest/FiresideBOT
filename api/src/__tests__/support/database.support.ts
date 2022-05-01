import AppDataSource from '../../db/dataSource';
import waitForPostgres from '../../db/waitForPostgres';

import dbConfig from './dbConfig.support.js';

export async function connectToTestingDatabase() {
    AppDataSource.setOptions(dbConfig);
    await waitForPostgres(AppDataSource);
};