knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    port: '5432',
    user : 'amysanfelipe',
    database : 'nbc_navigation'
  }
});

module.exports.saveLink = (link) => {
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
  .then((link) => {
    return link;
  })
  .catch((err) => {
    console.log('Unable to retrieve links from database', err);
  })
}

module.exports.updateLink = () => {

}

module.exports.removeLink = () => {

}