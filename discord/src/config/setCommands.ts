import { CommandCategory, CommandFileImport } from '../types/commands.js';

import config from './index.js';

import { logs, colors, promises, fileSystem } from '../utils/index.js';
import { HandleReturn } from 'src/types/promises.js';

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

    const filePath = "../../" + path + "/" + dirSyncConfigFiles[0];
    const [res, err] = await promises.handle(import(`${filePath}`));

    if(err) {
        return [undefined, err];
    }

    return [{ ...res.default, name: path.split("/").pop() }, undefined];
};

async function getCommandFile(path: string): HandleReturn<CommandFileImport> {
    const dirSyncFiles = await fileSystem.getDirectoryFileNamesList(path);
    const commandFile = dirSyncFiles.filter((file) => file.split(".")[0] === "index")[0];

    if(!commandFile) {
        return [undefined, new Error("No Command File")];
    }

    const filePath = "../../" + path + "/" + commandFile;
    const [res, err] = await promises.handle(import(`${filePath}`));

    if(err) {
        return [undefined, err];
    }

    return [res, undefined];
};

async function setCommands() {
    const categoryList: string[] = await fileSystem.getDirectoryNameList("./dist/commands");

    for(let i = 0; i < categoryList.length; i++) {
        const categoryPath = `./dist/commands/${categoryList[i]}`;
        const commandDirList = await fileSystem.getDirectoryNameList(categoryPath);
        const [categoryConfig, categoryConfigErr] = await getCategoryConfig(categoryPath);

        if(categoryConfigErr) {
            return logs.error({ 
                color: colors.error, 
                err: categoryConfigErr, 
                type: "COMMANDS", 
                message: categoryConfigErr.message 
            });
        }

        if(!categoryConfig) {
            return logs.error({ 
                color: colors.error, 
                type: "COMMANDS", 
                message: "Command Category Config Undefined"
            });
        }

        config.categories.push(categoryConfig);

        if(commandDirList.length <= 0) {
            logs.error({ color: colors.error, type: "LOG", message: `No ${categoryList[i]} Commands Found` });
            continue;
        }

        for(let x = 0; x < commandDirList.length; x++) {
            const commandDir = commandDirList[x];
            const commandPath = categoryPath + "/" + commandDir; 
            const [commandFile, commandFileErr] = await getCommandFile(commandPath);

            if(commandFileErr) {
                return logs.error({ 
                    color: colors.error, 
                    err: commandFileErr, 
                    type: "COMMANDS", 
                    message: commandFileErr.message 
                });
            }

            if(!commandFile) {
                return logs.error({ 
                    color: colors.error, 
                    type: "COMMANDS", 
                    message: "Command File Undefined"
                });
            }

            config.commands.push({ 
                ...commandFile.config,
                name: commandDir.toLocaleLowerCase(),
                displayName: commandDir,
                category: categoryPath.split("/").pop() as string,
                run: commandFile.default 
            });
        };
    };

    logs.log({ color: colors.success, type: "LOG", message: "Commands Set" })
};

export default setCommands;