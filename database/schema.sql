DROP DATABASE IF EXISTS nbc_navigation;

CREATE DATABASE nbc_navigation;

\c nbc_navigation;

DROP TABLE IF EXISTS navigation;

CREATE TABLE navigation (
  id SERIAL PRIMARY KEY,
  link_title TEXT NULL,
  link_url TEXT NULL
);