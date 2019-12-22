const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM working_changelogs ORDER BY id DESC');
    },
    findById(id) {
        return db.one('SELECT * FROM working_changelogs WHERE id = $1', id);
    },
    save(changelog) {
        return db.one(`INSERT INTO working_changelogs (content, version, type)
        VALUES ($/content/, $/version/, $/type/)
        RETURNING *`, changelog);
    },
    update(changelog) {
        return db.one(`UPDATE working_changelogs
        SET
        content = $/content/,
        version = $/version/,
        type = $/type/
        WHERE id = $/id/
        RETURNING *`, changelog);
    },
    delete(id) {
        return db.none('DELETE FROM working_changelogs WHERE id = $1', id);
    }
};