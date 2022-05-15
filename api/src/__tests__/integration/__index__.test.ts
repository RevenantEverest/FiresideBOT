import AppDataSource from '../../db/dataSource.js';
import { connectToTestingDatabase } from '../support/database.support.js';
import { DB_TIMEOUT } from '../support/constants/database.js';

import playlistTests from './playlists/__index__.js';

describe("Integration Tests", () => {
    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    
    describe("playlist routes", playlistTests);
});