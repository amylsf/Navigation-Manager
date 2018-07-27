const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'amysanfelipe',
    database : 'nbc_navigation'
  }
});

module.exports.saveLink = (link) => {
  link = {
    link_title: 'meow',
    link_url: 'also meow'
  }
  return knex('navigation')
  .insert({
    link_title: link.link_title,
    link_url: link.link_url
  })
  .catch((err) => {
    console.log('Unable to save link to database', err);
  })
}

module.exports.fetchLinks = () => {
  return knex('navigation')
  .then((links) => {
    return links;
  })
  .catch((err) => {
    console.log('Unable to retrieve links from database', err);
  })
}

module.exports.updateLink = () => {

}

module.exports.removeLink = () => {

}