DROP TABLE IF EXISTS Command_Logs;
DROP TABLE IF EXISTS API_Logs;
DROP TABLE IF EXISTS CommandError_Logs;
DROP TABLE IF EXISTS API_Error_Logs;

CREATE TABLE Command_Logs(
  id SERIAL PRIMARY KEY,
  command VARCHAR(255),
  args VARCHAR(255),
  message VARCHAR(255),
  user_id VARCHAR(255),
  guild_id VARCHAR(255),
  log_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE API_Logs(
  id SERIAL PRIMARY KEY,
  route VARCHAR(255),
  message VARCHAR(255),
  log_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE CommandError_Logs(
  id SERIAL PRIMARY KEY,
  command VARCHAR(255),
  args VARCHAR(255),
  message VARCHAR(255),
  error VARCHAR(255),
  user_id VARCHAR(255),
  guild_id VARCHAR(255),
  log_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE API_Error_Logs(
  id SERIAL PRIMARY KEY,
  route VARCHAR(255),
  message VARCHAR(255),
  status_code INT,
  log_date TIMESTAMP WITH TIME ZONE
);
