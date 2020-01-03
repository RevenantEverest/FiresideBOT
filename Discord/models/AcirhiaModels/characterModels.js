const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM characters');
    },
    findById(id) {
        return db.one('SELECT * FROM characters WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM characters WHERE discord_id = $1', id);
    },
    findFullCharacterByDiscordId(id) {
        return db.one(`SELECT * FROM characters JOIN character_stats ON characters.discord_id = character_stats.discord_id
        JOIN character_equipment ON characters.discord_id = character_equipment.discord_id WHERE characters.discord_id = $1`, id);
    },
    save(character) {
        return db.one(`INSERT INTO characters (discord_id, level, exp, hit_points, max_hit_points, gold, level_up)
        VALUES($/discord_id/, $/level/, $/exp/, $/hit_points/, $/max_hit_points/, $/gold/, $/level_up/)
        RETURNING *`, character);
    },
    update(character) {
        return db.one(`UPDATE characters
        SET
        level = $/level/,
        exp = $/exp/,
        hit_points = $/hit_points/,
        max_hit_points = $/max_hit_points/,
        gold = $/gold/,
        level_up = $/level_up/
        WHERE discord_id = $/discord_id/
        RETURNING *`, character);
    },
    delete(id) {
        return db.none('DELETE FROM characters WHERE id = $1', id);
    }
};