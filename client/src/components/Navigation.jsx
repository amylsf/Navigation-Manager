import React, { Component } from 'react';
import axios from 'axios';
import Link from './Link.jsx';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    }

    this.addLink = this.addLink.bind(this);
    this.fetchLinks = this.fetchLinks.bind(this);
  }

  componentDidMount() {
    this.fetchLinks();
  }

  addLink() {
    axios.post('/navigation', {
      link: {
        link_title: '',
        link_url: ''
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
        <button onClick={this.addLink}>+ item</button>
        {this.state.links.map((link) => {
          return (
            <Link 
              key={link.id}
              link={link}
              fetchLinks={this.fetchLinks}
              />
          )
        })}
      </div>
    )
  }
}

export default Navigation;