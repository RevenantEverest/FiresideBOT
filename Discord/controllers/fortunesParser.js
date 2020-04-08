module.exports = async (message, fortune) => {
    if(/\${.*}/gi.test(fortune)) {
        let variables = fortune.match(/\${([^}]*)}/g);

        variables.forEach(async (el, idx) => {
            let exec = /\${([^}]*)}/.exec(el)[1];

            if(exec.toLowerCase() === "touser") fortune = fortune.replace("${" + exec + "}", message.author);

            if(/<@&?(\d+)>/.exec(exec)) {
                let role_id = /<@&?(\d+)>/.exec(exec)[1];
                fortune = fortune.replace("${<@&" + exec + ">}", `<@&${role_id}>`);
            }

            if(idx === (variables.length - 1)) return message.channel.send(fortune);
        });
    }
    else return message.channel.send(fortune);
};