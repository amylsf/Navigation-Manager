import React, { Component } from 'react';

class Link extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      link_title: '',
      link_url: ''
    }
  }


  render() {
    return (
      <form>
        <input value={this.state.link_title}/>
        <input value={this.state.link_url}/>
      </form>
    )
  }
}

export default Link;