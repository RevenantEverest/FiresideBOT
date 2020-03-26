DROP TABLE IF EXISTS discord_tickets;
DROP TABLE IF EXISTS discord_closed_tickets;

CREATE TABLE discord_tickets (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    initial_message VARCHAR(1024),
    ticket_date VARCHAR(255)
);

CREATE TABLE discord_closed_tickets (
    ticket_id BIGINT,
    discord_id VARCHAR(255),
    initial_message VARCHAR(1024),
    ticket_date VARCHAR(255),
    close_date VARCHAR(255),
    closed_by VARCHAR(255),
    reason VARCHAR(1024)
);