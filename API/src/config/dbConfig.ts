import dotenv from 'dotenv';
import TypeORM from 'typeorm';

dotenv.config();

const DB_PORT = parseInt(process.env.DB_PORT!, 10);

const dbConfig: TypeORM.ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST!,
    port: DB_PORT,
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    synchronize: true,
    logging: false,
    entities: [
        "../dist/**/entities/*.js"
    ],
    migrations: [
        "../dist/**/migrations/*.js"
    ],
    subscribers: [
        "../dist/**/subscribers/*.ts"
    ],
    cli: {
        entitiesDir: "../entities",
        migrationsDir: "../migrations",
        subscribersDir: "../subscribers"
    }
};

export default dbConfig;