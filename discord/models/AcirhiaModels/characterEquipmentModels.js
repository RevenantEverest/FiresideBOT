const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM character_equipment');
    },
    findById(id) {
        return db.one('SELECT * FROM character_equipment WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM character_equipment WHERE discord_id = $1', id);
    },
    save(equipment) {
        return db.one(`INSERT INTO character_equipment (
            discord_id,
            helmet,
            neck,
            back,
            chest,
            waist,
            hands,
            wrists,
            legs,
            feet,
            ring1,
            ring2,
            trinket1,
            trinket2,
            main_hand,
            off_hand
        ) VALUES (
            $/discord_id/,
            $/helmet/,
            $/neck/,
            $/back/,
            $/chest/,
            $/waist/,
            $/hands/,
            $/wrists/,
            $/legs/,
            $/feet/,
            $/ring1/,
            $/ring2/,
            $/trinket1/,
            $/trinket2/,
            $/main_hand/,
            $/off_hand/
        )
        RETURNING *`, equipment);
    },
    update(equipment) {
        return db.one(`UPDATE character_equipment
        SET
        helmet = $/helmet/,
        neck = $/neck/,
        back = $/back/,
        chest = $/chest/,
        waist = $/waist/,
        hands = $/hands/,
        wrists = $/wrists/,
        legs = $/legs/,
        feet = $/feet/,
        ring1 = $/ring1/,
        ring2 = $/ring2/,
        trinket1 = $/trinket1/,
        trinket2 = $/trinket2/,
        main_hand = $/main_hand/,
        off_hand = $/off_hand/
        WHERE discord_id = $/discord_id/
        RETURNING *`, equipment);
    },
    delete(id) {
        return db.one('DELETE FROM character_equipment WHERE id = $1', id);
    }
};