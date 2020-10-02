const exec = require('child_process').exec;
const services = {};

function runCommand(res, command, callback) {
    exec(command, execCommand);
    function execCommand(err, stdout, stderr) {
        if(err) {
            console.error(err);
            return res.status(400).json({ error: "Bad Request" });
        }
        else if(stdout) {
            console.log("[System Command]", command);
            callback(stdout);
        }
        else if(stderr) {
            console.log(stderr);
            return res.status(400).json({ error: "Bad Request" });
        }
    };
}

services.restart = (req, res, next) => {
    const command = `pm2 restart ${req.params.service ? req.params.service : "all"}`;
    runCommand(res, command, handleSuccess);

    function handleSuccess() {
        return res.json({ message: "Success" });
    }
};

services.stop = (req, res, next) => {
    const command = `pm2 stop ${req.params.service ? req.params.service : "all"}`;
    runCommand(res, command, handleSuccess);

    function handleSuccess() {
        return res.json({ message: "Success" });
    }
};

services.start = (req, res, next) => {
    const command = `pm2 start ${req.params.service ? req.params.service : "all"}`;
    runCommand(res, command, handleSuccess);

    function handleSuccess() {
        return res.json({ message: "Success" });
    }
};

services.getProcessInfo = (req, res, next) => {
    const command = "pm2 list";
    runCommand(res, command, parseData);

    function parseData(stdout) {
        stdout = stdout.replace("┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐", "");
        stdout = stdout.replace("│", "");
        stdout = stdout.replace("└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘", "");
        stdout = stdout.replace(/\r?\n|\r/g, "");
        stdout = stdout.split("├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤");
        if(!stdout[1]) {
            console.log(stdout); 
            return res.status(500).json({ error: "Error Parsing Output" });
        }
        stdout = stdout[1].split("││");
        stdout[0] = stdout[0].split("");
        stdout[0].splice(0, 1);
        stdout[0] = stdout[0].join("");
        stdout = stdout.map((el, idx) => {
            el = el.split("│");
            return { 
                id: el[0].trim(), 
                name: el[1].trim(), 
                namespace: el[2].trim(), 
                version: el[3].trim(), 
                mode: el[4].trim(),
                pid: el[5].trim(),
                uptime: el[6].trim(),
                status: el[8].trim(),
                cpu: el[9].trim(),
                mem: el[10].trim()  
            };
        }).filter(Boolean);

        return res.json({ data: stdout });
    }
};

module.exports = services;