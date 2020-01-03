const db = require('../../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM character_stats');
    },
    findById(id) {
        return db.one('SELECT * FROM character_stats WHERE id = $1', id);
    },
    findByDiscordId(id) {
        return db.one('SELECT * FROM character_stats WHERE discord_id = $1', id);
    },
    save(stats) {
        return db.one(`INSERT INTO character_stats (
            discord_id,
            attack,
            defense,
            wood_cutting,
            mining,
            fishing,
            herbalism,
            skinning,
            alchemy,
            blacksmithing,
            leather_working,
            tailoring,
            enchanting,
            jewel_crafting,
            inscription,
            first_aid,
            cooking,
            fire_making,
            survival,
            charisma,
            perception,
            endurance,
            vitality,
            stealth,
            strength,
            dexterity,
            luck
        ) VALUES (
            $/discord_id/,
            $/attack/,
            $/defense/,
            $/wood_cutting/,
            $/mining/,
            $/fishing/,
            $/herbalism/,
            $/skinning/,
            $/alchemy/,
            $/blacksmithing/,
            $/leather_working/,
            $/tailoring/,
            $/enchanting/,
            $/jewel_crafting/,
            $/inscription/,
            $/first_aid/,
            $/cooking/,
            $/fire_making/,
            $/survival/,
            $/charisma/,
            $/perception/,
            $/endurance/,
            $/vitality/,
            $/stealth/,
            $/strength/,
            $/dexterity/,
            $/luck/
        ) RETURNING *`, stats);
    },
    update(stats) {
        return db.one(`UPDATE character_stats
        SET
        attack = $/attack/,
        defense = $/defense/,
        wood_cutting = $/wood_cutting/,
        mining = $/mining/,
        fishing = $/fishing/,
        herbalism = $/herbalism/,
        skinning = $/skinning/,
        alchemy = $/alchemy/,
        blacksmithing = $/blacksmithing/,
        leather_working = $/leather_working/,
        tailoring = $/tailoring/,
        enchanting = $/enchanting/,
        jewel_crafting = $/jewel_crafting/,
        inscription = $/inscription/,
        first_aid = $/first_aid/,
        cooking = $/cooking/,
        fire_making = $/fire_making/,
        survival = $/survival/,
        charisma = $/charisma/,
        perception = $/perception/,
        endurance = $/endurance/,
        vitality = $/vitality/,
        stealth = $/stealth/,
        strength = $/strength/,
        dexterity = $/dexterity/,
        luck = $/luck/
        WHERE discord_id = $/discord_id/
        RETURNING *`, stats);
    },
    delete(id) {
        return db.one('DELETE FROM character_stats WHERE id = $1', id);
    }
};