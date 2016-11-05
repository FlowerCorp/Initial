DROP DATABASE IF EXISTS flowerCorp;
CREATE DATABASE flowerCorp;

\c flowerCorp;

CREATE TABLE conversations (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER
);

CREATE TABLE users_conversations (
  ID SERIAL PRIMARY KEY,
  user_id,
  conversation_id
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  token VARCHAR,
  username VARCHAR,
  conversation_id, INTEGER,
);