import React, { Component } from 'react';
import axios from 'axios';

class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link_title: this.props.link.link_title,
      link_url: this.props.link.link_url,
      showFlyout: false,
      cardIsOpen: false
    }
    
    this.removeLink = this.removeLink.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  updateLink(id, link_title, link_url) {
    axios.put('/navigation', {
      link: {
        id: id,
        link_title: link_title,
        link_url: link_url
      }
    })
    .then(() => {
      this.props.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleClick() {
    this.setState({
      showFlyout: !this.state.showFlyout
    })
  }

  handleEdit() {
    this.setState({
      cardIsOpen: !this.state.cardIsOpen,
      showFlyout: false
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.updateLink(this.props.link.id, this.state.link_title, this.state.link_url);
    })
  }

  render() {
    return (
      <div>
      {this.state.cardIsOpen ? 
        <div className="link-card">
          <div className="back-button" onClick={this.handleEdit}>{"<"}</div>
          <
          br/>
          <div className="input-form">
            <form autoComplete="off">
              <div>Link title</div>
              <input className="link-input" name="link_title" type="text" value={this.state.link_title} onChange={(e) => {this.handleChange(e)}}/>
              <br/>
              <div>Link url</div>
              <input className="link-input" name="link_url" type="text" value={this.state.link_url} onChange={(e) => {this.handleChange(e)}}/>
            </form>
          </div>
        </div> :
        <div className="link-container">
          <span className="link-title">{this.props.link.link_title}</span>
          <span className="link-button" onClick={this.handleClick}>. . .</span>
        </div>
        }
      {this.state.showFlyout ? 
        <div>
          <div onClick={this.handleEdit}>Edit</div>
          <div onClick={(e) => {this.removeLink(e, this.props.link.id)}}>Remove</div>
        </div> : null}
      </div>
    )
  }
}

export default Link;