import React, { Component } from 'react';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    }
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