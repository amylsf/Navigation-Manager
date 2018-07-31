# Navigation Manager

Simple tool to manage your navigational links. Add a link and re-order your links with drag and drop functionality.

<img width="360" alt="nav-main-view" src="https://user-images.githubusercontent.com/17116435/43464287-b917bfde-94a8-11e8-896b-dab42062a13d.png"> <img width="350" alt="nav-edit-view" src="https://user-images.githubusercontent.com/17116435/43464460-2a5e741c-94a9-11e8-8933-f41063be2219.png">


## Installing Dependencies

1. Clone this repo down to your local machine
2. From within your terminal, install node:
```sh
brew install node
```
3. If you don't already have Postgres and a db with your username running:
```sh
brew install postgresql
pg_ctl -D /usr/local/var/postgres start
createdb `whoami`
```
4. Install project dependencies:
```sh
npm install
```
5. Run Postgres:
```sh
psql < database/schema.sql
```
6. Start server:
```sh
npm run start
```
7. Load page on localhost:3000

## Tech

- React, Node.js, Express, Knex, PostgreSQL
