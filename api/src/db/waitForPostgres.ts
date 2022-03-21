import { ConnectionOptions, getConnection } from 'typeorm';
import { logs, colors } from '../utils/index.js';

function handleError(err: Error) {
    const errString = err.toString();

    if(!errString.split(" ").includes("ECONNREFUSED")) {
        logs.error({ color: colors.warning, type: "DB", err });
    }
};

async function waitForPostgres(createConnection:Function, dbConfig:ConnectionOptions) {
    let retries = 5;
    while(retries) {
        try {
            await createConnection(dbConfig);
            logs.log({ color: colors.success, message: "Connected to Postgres! 💅✨" });
            break;
        }
        catch(err) {
            const error = err as Error;
            handleError(error);
            retries -= 1;
            logs.log({ color: colors.warning, type: "DB", message: `Retries left: ${retries}` });
            await new Promise(res => setTimeout(res, 5000));
        }
    };

    if(!getConnection())
        throw new Error("Postgres failed to start...");
};

export default waitForPostgres;
