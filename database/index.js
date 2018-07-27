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
  console.log(link)
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

module.exports.fetchLinks = () => {
  return knex('navigation')
  .then((links) => {
    return links;
  })
  .catch((err) => {
    console.log('Unable to retrieve links from database', err);
  })
}

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
  .then(() => {
    console.log('updated link successfully');
  })
  .catch((err) => {
    console.log('Unable to update link', err);
  })
}

module.exports.removeLink = (id) => {
  return knex('navigation')
  .where({
    id: id
  })
  .del()
  .then(() => {
    console.log('successfully deleted');
  })
  .catch((err) => {
    console.log(err);
  })
}