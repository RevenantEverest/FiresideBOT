import AppDataSource from '@@db/dataSource.js';
import waitForPostgres from '@@db/waitForPostgres.js';

import dbConfig from './dbConfig.support.js';

export async function connectToTestingDatabase() {
    AppDataSource.setOptions(dbConfig);
    await waitForPostgres(AppDataSource);
};

export async function clearTable() {
    AppDataSource.dropDatabase();
    AppDataSource.setOptions(dbConfig);
};