const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM articles');
    },
    findById(id) {
        return db.one('SELECT * FROM articles WHERE id = $1', id);
    },
    findByAuthorId(id) {
        return db.one('SELECT * FROM articles WHERE author_id = $1', id);
    },
    findByTagId(id) {
        return db.many('SELECT * FROM articles WHERE $1 = all (tag_ids)', id);
    },
    save(article) {
        return db.one(`INSERT INTO articles (auhtor_id, title, content, tags, published, last_edited)
        VALUES ($/author_id/, $/title/, $/content/, $/tags/, $/published/, $/last_edited/)
        RETURNING *`, article);
    },
    delete(id) {
        return db.none('DELETE FROM articles WHERE id = $1', id);
    }
};