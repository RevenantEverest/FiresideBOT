DROP TABLE IF EXISTS acirhia_characters;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    level INT,
    exp INT,
    hit_points INT,
    max_hit_points INT,
    gold INT,
    level_up BOOLEAN
);

CREATE TABLE character_stats (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    attack INT,
    defense INT,
    wood_cutting INT,
    mining INT,
    fishing INT,
    herbalism INT,
    skinning INT,
    alchemy INT,
    blacksmithing INT,
    leather_working INT,
    tailoring INT,
    enchanting INT,
    jewel_crafting INT,
    inscription INT,
    first_aid INT,
    cooking INT,
    fire_making INT,
    survival INT,
    charisma INT,
    perception INT,
    endurance INT,
    vitality INT,
    stealth INT,
    strength INT,
    dexterity INT,
    luck INT
);

CREATE TABLE character_equipment (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    helmet INT,
    neck INT,
    back INT,
    chest INT,
    waist INT,
    hands INT,
    wrists INT,
    legs INT,
    feet INT,
    ring1 INT,
    ring2 INT,
    trinket1 INT,
    trinket2 INT,
    main_hand INT,
    off_hand INT
);