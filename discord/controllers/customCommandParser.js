const errorHandler = require('./errorHandler');

module.exports = async (bot, message, customCommand) => {
    /*
        ${Choice1, Choice2, Choice3} returns one of the choices separated by commas
        ${touser} tags the user in the output
        ${count} // Idk how to implement this
        ${role} Gives user the tagged role
    */
    let output = customCommand.output;

    if(/\${.*}/gi.test(output)) {
        let variables = output.match(/\${([^}]*)}/g);

        variables.forEach(async (el, idx) => {
            let exec = /\${([^}]*)}/.exec(el)[1];

            console.log(exec);

            /* To User */
            if(exec.toLowerCase() === "touser") output = output.replace("${" + exec + "}", message.author);

            /* Random Response */
            if(exec.includes(",")) {
                let choices = exec.split(",");
                let randomResponse = choices[Math.floor(Math.random() * choices.length)];
                output = output.replace(/\${([^}]*)}/, randomResponse);
            }

            /* Random User */
            if(exec.toLowerCase() === "randomuser") {
                let guildMembers = [];
                await message.guild.members.fetch()
                .then(members => guildMembers = members.array())
                .catch(err => errorHandler(bot, message, err, "Error Parsing Custom Command", "Custom Command parser"))
                guildMembers = guildMembers.filter(gm => !gm.bot);
                output = output.replace("${" + exec + "}", guildMembers[Math.floor(Math.random() * guildMembers.length)]);
            }

            /* Role Receive */
            if(/<@&?(\d+)>/.exec(exec)) {
                let role_id = /<@&?(\d+)>/.exec(exec)[1];
                await message.member.addRole(role_id, 'Fireside Custom Command')
                .then(() => output = "Role Received!")
                .catch(err => {
                    output = "Error giving out Role. Make sure role still exists or check Fireside's permissions to grant roles";
                    console.error(err);
                });
            }

            if(idx === (variables.length - 1)) return message.channel.send(output);
        });
    }
    else return message.channel.send(output);
};