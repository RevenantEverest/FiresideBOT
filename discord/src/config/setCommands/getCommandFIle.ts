import { CommandFileImport } from '../../types/commands.js';
import { HandleReturn } from '../../types/promises.js';
import { promises, fileSystem } from '../../utils/index.js';

async function getCommandFile(path: string): HandleReturn<CommandFileImport> {
    const dirSyncFiles = await fileSystem.getDirectoryFileNamesList(path);
    const commandFile = dirSyncFiles.filter((file) => {
        const fileNameArr = file.split(".");
        console.log(fileNameArr);
        if(fileNameArr[0] === "index" && fileNameArr[1] === "command") {
            return file;
        }
    })[0];

    if(!commandFile) {
        return [undefined, new Error("No Command File")];
    }

    const filePath = "../../../" + path + "/" + commandFile;
    const [res, err] = await promises.handle(import(`${filePath}`));

    if(err) {
        return [undefined, err];
    }

    return [res, undefined];
};

export default getCommandFile;