const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM changelogs ORDER BY id DESC');
    },
    findById(id) {
        return db.one('SELECT * FROM changelogs WHERE id = $1', id);
    },
    save(changelog) {
        return db.one(`INSERT INTO changelogs (content, version, release_date, type)
        VALUES ($/content/, $/version/, $/release_date/, $/type/)
        RETURNING *`, changelog);
    },
    update(changelog) {
        return db.one(`UPDATE changelogs
        SET
        content = $/content/,
        version = $/version/,
        type = $/type/
        WHERE id = $/id/
        RETURNING *`, changelog);
    },
    delete(id) {
        return db.none('DELETE FROM changelogs WHERE id = $1', id);
    }
};