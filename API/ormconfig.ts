export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    logging: false,
    entities: [
        "dist/**/entities/*.js"
    ],
    migrations: [
        "dist/**/migrations/*.js"
    ],
    subscribers: [
        "dist/**/subscribers/*.ts"
    ],
    cli: {
        entitiesDir: "src/entities",
        migrationsDir: "src/migrations",
        subscribersDir: "src/subscribers"
    }
};