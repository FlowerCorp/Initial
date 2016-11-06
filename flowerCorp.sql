DROP DATABASE IF EXISTS flowercorp;
CREATE DATABASE flowercorp;

\c flowercorp;

CREATE TABLE conversations (
  ID SERIAL PRIMARY KEY,
  message VARCHAR,
  user_id INTEGER
);

CREATE TABLE users_conversations (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER,
  conversation_id INTEGER
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  token VARCHAR,
  username VARCHAR,
  conversation_id INTEGER
);