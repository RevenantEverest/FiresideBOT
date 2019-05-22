const config = require('../config/config');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    write() {
        const categories = ['Admin', 'Dev', 'Economy', 'Fun', 'GameStats', 'Info', 'Music', 'Other', 'Support'];
        let readme_value = '';

        categories.forEach((category, idx) => {
            let readme_commands = '';
            let command_category = config.Discord_Commands.filter(commands => commands.category === category);
            command_category.forEach(el => {
                let param = (el.params ? (el.params.required ? ("`" + "<param>" + "`") : ("`" + "[param]" + "`")) : '');
                let flags = '';
                let aliases = '';
                if(el.flags) el.flags.forEach(flag => flags += ("`" + flag + "` "));
                if(el.aliases) el.aliases.forEach(alias => aliases += ("`" + alias + "` "));
                readme_commands +=  
                `- [${el.d_name}](https://help.firesidebot.com/commands/${el.name}) ${param}  \n` +
                `**Desc**: ${el.desc}  \n` +
                `${el.aliases ? `**Aliases**: ${aliases}  \n` : ''}` +
                `${el.params ? `**Params**: ${el.params.params}  \n` : ''}` +
                `${el.flags ? `**Flags**: ${flags}  \n` : ''}` +
                `**Example**: ${("`?" + el.example + "`")}  \n\n`
            });
            readme_value += 
            `<a id="${category}"></a>  \n\n` +
            `#### ${category}  \n\n` +
            `${readme_commands}  \n\n` +
            `--- \n\n`;
        });

        let tableOfContents = '';

        categories.forEach(el => {
            tableOfContents += 
            `[${el}](#${el}) \n\n`;
        })

        let README = 
        
        `# FiresideBOT  \n` +
        `A Music, Economy, & Admin Discord Bot written in Node.js  \n\n` +
        `###### Current Version: ${config.Discord_Options.version}  \n` +
        `[HelpDocs](help.firesidebot.com) || [Invite](https://discordapp.com/oauth2/authorize?` +
        `client_id=441338104545017878&response_type=code&permissions=8&scope=bot) || [Online Control Panel](firesidebot.com)  \n\n` +
        `---  \n\n` +
        `## Table of Contents  \n\n` +
        `${tableOfContents}` +
        `---  \n\n` +
        `# Features  \n\n` +
        `---  \n\n` +
        `### Commands  \n` +
        `${("`" + "<param>" + "`")} indicates a required parameter while ${("`" + "[param]" + "`")} indicates an optional parameter  \n\n` +
        `---  \n\n` +
        `${readme_value}`


        fs.writeFile("../README.md", README, (err) => {
            if(err) return console.error(err);
            console.log(chalk.hex("#ff9900")("[Log]") + " README Updated");
        });
    }
}