module.exports =async (flavorText, trackerData, streamer) => {
    if(/\${.*}/gi.test(flavorText)) {
        let variables = flavorText.match(/\${([^}]*)}/g);

        variables.forEach(async (el, idx) => {
            let exec = /\${([^}]*)}/.exec(el)[1];

            if(exec.toLowerCase() === "streamer") flavorText = flavorText.replace("${" + exec + "}", streamer);

            if(exec.toLowerCase() === "role" && trackerData.role_id !== "none") 
                flavorText = flavorText.replace("${" + exec + "}", `<@&${trackerData.role_id}>`);
            else if(exec.toLowerCase() === "role" && trackerData.role_id === "none")
                flavorText = flavorText.replace("${" + exec + "}", "");
        });

        return flavorText;
    }
    else return flavorText;
};