import { ConnectionOptions, getConnection } from 'typeorm';
import { ERRORS } from '../constants/index.js';
import { logs, colors } from '../utils/index.js';

function handleError(err: Error) {
    logs.error({ color: colors.warning, type: "DB", err });
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
            retries -= 1;
            logs.log({ color: colors.warning, type: "DB", message: `Retries left: ${retries}` });
            await new Promise(res => setTimeout(res, 5000));

            if(retries === 5) {
                handleError(error);
            }
        }
    };

    if(!getConnection()) {
        throw new Error(ERRORS.POSTGRES_FAILED_TO_START);
    }
};

export default waitForPostgres;
