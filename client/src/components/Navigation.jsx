import React, { Component } from 'react';
import axios from 'axios';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    }

    this.addLink = this.addLink.bind(this);
    this.fetchLinks = this.fetchLinks.bind(this);
  }

  addLink(title, url) {
    axios.post('/navigation', {
      link: {
        link_title: title,
        link_url: url
      }
    })
    .then(() => {
      this.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  fetchLinks() {
    axios.get('/navigation')
    .then(({data}) => [
      this.setState({
        links: data
      })
    ])
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <div>Navigation</div>
        <div>+ item</div>
      </div>
    )
  }
}

export default Navigation;