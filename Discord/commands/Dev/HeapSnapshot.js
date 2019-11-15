const heapdump = require('heapdump');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(message.author.id !== "163346982709100546") return;
    heapdump.writeSnapshot();
    message.channel.send("Heap Snapshot Taken");
};

module.exports.config = {
    name: 'heapsnapshot',
    d_name: "HeapSnapshot",
    aliases: ['hss'],
    category: 'Dev',
    desc: 'Takes a heap snapshot'
};