const db = require('../../config/connection');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function save(roles) {
    console.log(roles);
    return db.one(`INSERT INTO array_test (roles) VALUES (ARRAY[$/roles_array/]) RETURNING *`, roles);
};

async function findAll() { return db.many('SELECT * FROM array_test'); }

async function update(roles) {
    return db.one(`UPDATE array_test
    SET
    roles = $/roles_array/
    WHERE id = 20
    RETURNING *`, roles);
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    // let role_id = null;

    // if(args.includes("@everyone")) role_id = "@everyone";
    // else if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    // else role_id = "none";

    // findAll().then(roles => {
    //     console.log(roles[0].roles)
    //     roles[0].roles.push(role_id);
    //     update({roles_array: roles[0].roles}).then(roles => console.log(roles.roles));
    //     // console.log(roles[0].roles);
    // })
    // .catch(err => {
    //     if(err instanceof QRE && err.code === qrec.noData)
    //         save({roles_array: role_id});
    //     else console.error(err);
    // });

    console.log(message.member._roles);
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: 'Dev',
    desc: ''
};