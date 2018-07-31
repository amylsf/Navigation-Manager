DROP DATABASE IF EXISTS nbc_navigation;

CREATE DATABASE nbc_navigation;
DROP ROLE nav_admin;
CREATE ROLE nav_admin WITH LOGIN SUPERUSER; /* wouldn't typically add superuser, but easiest way to give you access */

\c nbc_navigation;

DROP TABLE IF EXISTS navigation;

CREATE TABLE navigation (
  id SERIAL PRIMARY KEY,
  link_title TEXT NULL,
  link_url TEXT NULL,
  index SMALLINT NOT NULL
);

/* 

If I had multiple navigations in this project, my schema might look more like the following:

CREATE TABLE navigation (
  id SERIAL PRIMARY KEY,
  nav_name TEXT NOT NULL
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  link_title TEXT NULL,
  link_url TEXT NULL,
  index SMALLINT NOT NULL
  nav_id SMALLINT REFERENCES navigation(id)
);

*/