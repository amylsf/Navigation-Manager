import React, { Component } from 'react';
import axios from 'axios';

class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link_title: this.props.link.link_title,
      link_url: this.props.link.link_url
    }
    
    this.removeLink = this.removeLink.bind(this);
  }

  removeLink(e, link_id) {
    e.preventDefault();
    axios.delete('/navigation', {
      params: {
        id: link_id
      }
    })
    .then(() => {
      this.props.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form>
        <input value={this.state.link_title}/>
        <input value={this.state.link_url}/>
        <button onClick={(e) => {this.removeLink(e, this.props.link.id)}}>...</button>
      </form>
    )
  }
}

export default Link;