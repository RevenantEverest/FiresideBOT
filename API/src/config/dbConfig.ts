import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const DB_PORT = parseInt(process.env.DB_PORT!, 10);

const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST!,
    port: DB_PORT,
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    synchronize: true,
    logging: false,
    entities: [
        "dist/entities/**/*"
    ],
    migrations: [
        "dist/migrations/**/*"
    ],
    subscribers: [
        "dist/subscribers/**/*"
    ],
    cli: {
        entitiesDir: "dist/entities",
        migrationsDir: "dist/migrations",
        subscribersDir: "dist/subscribers"
    }
};

export default dbConfig;