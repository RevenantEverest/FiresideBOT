import { DataSource } from 'typeorm';
import { logs, colors } from '../utils/index.js';

function handleError(err: Error) {
    logs.error({ color: colors.warning, type: "DB", err });
    return process.exit(1);
};

async function waitForPostgres(AppDataSource: DataSource): Promise<void | Error> {
    let retries = 5;
    while(retries) {
        try {
            await AppDataSource.initialize();
            logs.log({ color: colors.success, message: "Connected to Postgres! 💅✨" });
            break;
        }
        catch(err) {
            const error = err as Error;
            retries -= 1;
            logs.log({ color: colors.warning, type: "DB", message: `Retries left: ${retries + 1}` });
            await new Promise(res => setTimeout(res, 5000));

            if(retries === 0) {
                handleError(error);
            }
        }
    };
};

export default waitForPostgres;
