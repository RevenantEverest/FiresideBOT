import { ConnectionOptions, getConnection } from 'typeorm';
import { logs, colors } from '../utils/index.js';

async function waitForPostgres(createConnection:Function, dbConfig:ConnectionOptions) {
    let retries = 5;
    while(retries) {
        try {
            await createConnection(dbConfig);
            logs.log({ color: colors.success, message: "Connected to Postgres" });
            break;
        }
        catch(err) {
            console.log(err);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    };

    if(!getConnection())
        throw new Error("Postgres failed to start...");
};

export default waitForPostgres;
