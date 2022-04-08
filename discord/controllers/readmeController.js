const config = require('../config/config');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    write() {
        let readme_value = '';
        let categories = config.categories;
        categories.splice(categories.map(el => el.name).indexOf("Dev"), 1);
        categories.forEach((category, idx) => {
            let readme_commands = '';
            config.commands.filter(commands => commands.category === category.name).forEach(el => {
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
            `<a id="${category.name}"></a>  \n\n` +
            `#### ${category.name}  \n\n` +
            `${readme_commands}  \n\n` +
            `--- \n\n`;
        });

        let toc_commands = '';
        categories.forEach(el => toc_commands += `[${el.name}](#${el.name}), `);

        let README = 
        
        `# FiresideBOT  \n` +
        `A Music, Economy, & Admin Discord Bot written in Node.js  \n\n` +
        `###### Current Version: ${config.environment.version}  \n` +
        `[HelpDocs](https://help.firesidebot.com) || [Invite](https://discordapp.com/oauth2/authorize?` +
        `client_id=441338104545017878&response_type=code&permissions=8&scope=bot) || [Online Control Panel](https://firesidebot.com)  \n\n` +
        `---  \n\n` +
        `## Table of Contents  \n\n` +
        `| Category                 | Subcategory\n` +
        `| -------------            |:-------------\n` +
        `| [Commands](#Commands)    | ${toc_commands}\n` +
        `\n` +
        `---  \n\n` +
        `# Feature Highlights  \n\n` + 
        `#### Role Reactions:  \n` +
        `- Allow users to react to an embed and gain a role you assigned. Unreacting removed the role  \n\n` +
        `#### User Playlists:  \n` +
        `- Create a playlist that spans across servers. Playlists can be public or private, and public playlists can be viewed and requested by other users  \n\n` +
        `#### Server Playlists:  \n` + 
        `- Admins can create a server playlist which anyone in the server can request. Admins can also add Roles to that playlist allowing any server members with that role to add to the playlist.  \n\n` +
        `#### Auto Stream Poster:  \n` + 
        `- Add you or your favorite twitch streamer to a list of "Trackers" and anytime they go live, Fireside will post it in a text channel of your choice!  \n\n` +
        `#### Ranks:  \n` + 
        `- Create up to 20 ranks for server members to level up with, and have full control of the EXP they get and how hard it is to level up  \n\n` +
        `#### Welcome Message:  \n` + 
        `- Add a welcome message to your server that gets sent as a DM to every new member  \n\n` +
        `#### Custom Commands:  \n` + 
        `- Create custom commands that return any desired output!  \n\n` +
        `#### Server Logging:  \n` + 
        `- Log all the happenings in the server, to member updates, role creation/changes and more!  \n\n` + 
        `#### Streamer Roles: \n` +
        `- Grant a role to anyone in your server whose presence changes to *streaming* \n\n` +
        `#### New Member Messages: \n` +
        `- Setup a list of new member messages that can be pulled from and posted when a new member joins your server! \n\n` +
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