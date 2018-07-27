import React, { Component } from 'react';
import axios from 'axios';
import Link from './Link.jsx';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      errorMessage: false
    }

    this.addLink = this.addLink.bind(this);
    this.fetchLinks = this.fetchLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    if (this.state.links.length === 5) {
      this.setState({
        errorMessage: true
      })
    } else {
      this.addLink();
    }
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav-header">
          <span>Navigation</span>
          <span className="nav-button" onClick={this.handleClick}>+ item</span>
        </div>
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