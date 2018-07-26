import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigation.jsx';

class App extends Component {
  render() {
    return (
      <Navigation/>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));