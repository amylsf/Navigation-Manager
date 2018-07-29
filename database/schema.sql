DROP DATABASE IF EXISTS nbc_navigation;

CREATE DATABASE nbc_navigation;

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
  nav1_links_id SMALLINT REFERENCES nav1_links(id)
  nav2...
  nav3...
);

CREATE TABLE nav1_links (
  id SERIAL PRIMARY KEY,
  link_title TEXT NULL,
  link_url TEXT NULL,
  index SMALLINT NOT NULL
);

*/