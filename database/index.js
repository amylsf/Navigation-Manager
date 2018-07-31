const knex = require('knex')({ //would typically put this in config file but leaving it here for easy use
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'nav_admin',
    database : 'nbc_navigation'
  }
});

//adds a new link to the db
module.exports.saveLink = (link) => {
  return knex('navigation')
  .insert({
    link_title: link.link_title,
    link_url: link.link_url,
    index: link.index
  })
  .catch((err) => {
    console.log('Unable to save link to database', err);
  })
}

//fetches all links from db
module.exports.fetchLinks = () => {
  return knex('navigation')
  .orderBy('index', 'asc')
  .then((links) => {
    return links;
  })
  .catch((err) => {
    console.log('Unable to retrieve links from database', err);
  })
}

//updates content of a single link
module.exports.updateLink = (link) => {
  return knex('navigation')
  .where({
    id: link.id
  })
  .update({
    link_title: link.link_title,
    link_url: link.link_url,
    index: link.index
  })
  .catch((err) => {
    console.log('Unable to update link', err);
  })
}

//removes a link from db
module.exports.removeLink = (id) => {
  return knex('navigation')
  .where({
    id: id
  })
  .del()
  .catch((err) => {
    console.log('Unable to remove link from database', err);
  })
}