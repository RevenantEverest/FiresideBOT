import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

import config from '../index.js';
import getCategoryConfig from './getCategoryConfig.js';
import getCommandFile from './getCommandFile.js';

import { ENV } from '../../constants/index.js';
import { logs, colors, fileSystem } from '../../utils/index.js';

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
                slashCommand: commandFile.slashCommand,
                run: commandFile.default 
            });
        };
    };

    /* Set Slash Commands */
    const rest = new REST({ version: "10" }).setToken(ENV.DISCORD.KEY);
    const slashCommands = config.commands.map((command) => {
        if(command.slashCommand) {
            return command.slashCommand.toJSON();
        }
    }).filter(Boolean);

    await rest.put(
        Routes.applicationCommands(ENV.DISCORD.CLIENT_ID),
        { body: slashCommands }
    );

    logs.log({ color: colors.success, type: "LOG", message: "Commands Set" })
};

export default setCommands;