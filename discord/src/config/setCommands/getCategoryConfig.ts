import { CommandCategory } from '../../types/commands.js';
import { HandleReturn } from '../../types/promises.js';
import { promises, fileSystem } from '../../utils/index.js';

async function getCategoryConfig(path: string): HandleReturn<CommandCategory> {
    const dirSyncFiles = await fileSystem.getDirectoryFileNamesList(path);
    const dirSyncConfigFiles = dirSyncFiles.filter((file) => {
        const fileNameArr = file.split(".");
        if(fileNameArr[0] === "index" && fileNameArr[1] === "config") {
            return file;
        }
    });

    if(dirSyncFiles.length <= 0) {
        return [undefined, new Error("No Config File")];
    }

    const filePath = "../../../" + path + "/" + dirSyncConfigFiles[0];
    const [res, err] = await promises.handle(import(`${filePath}`));

    if(err) {
        return [undefined, err];
    }

    return [{ ...res.default, name: path.split("/").pop() }, undefined];
};

export default getCategoryConfig;