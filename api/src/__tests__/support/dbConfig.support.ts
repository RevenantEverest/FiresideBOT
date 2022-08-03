import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import * as Entities from '../../entities/index.js';

dotenv.config();

const TESTING_DB_PORT = parseInt(process.env.DB_PORT!, 10);

const dbConfig: DataSourceOptions = {
    type: "postgres",
    host: process.env.TESTING_DB_HOST!,
    port: TESTING_DB_PORT,
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    synchronize: true,
    logging: false,
    entities: Entities
};

export default dbConfig;