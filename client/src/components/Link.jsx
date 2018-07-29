import React, { Component } from 'react';
import axios from 'axios';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';


class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link_title: this.props.link.link_title,
      link_url: this.props.link.link_url,
      cardIsOpen: false
    }
  }

  handleEdit = () => {
    this.setState({
      cardIsOpen: !this.state.cardIsOpen
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeLink = (e, link_id) => {
    e.preventDefault();
    axios.delete('/navigation', {
      params: {
        id: link_id
      }
    })
    .then(() => {
      this.props.fetchLinks(this.props.updateAll);
    })
    .then(() => {
      console.log(this.props.links)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateOnBlur = () => {
    console.log('burrrrr')
    this.props.updateLink(this.props.link.id, this.state.link_title, this.state.link_url);
  }

  render = () => (
    <div>
      {this.state.cardIsOpen ? 
        <div className="link-card">
          <div className="back-button" onClick={this.handleEdit}><img className="back-button-img" src="/images/arrow-left.svg" height="20" width="20"></img></div>
          <div className="input-form">
            <form autoComplete="off">
              <div className="link-headers">Link title</div>
              <input className="link-input" name="link_title" type="text" value={this.state.link_title} maxLength={45} onChange={(e) => {this.handleChange(e)}}/>
              <br/>
              <div className="link-headers">Link url</div>
              <input className="link-input" name="link_url" type="text" value={this.state.link_url} onChange={(e) => {this.handleChange(e)}}/>
            </form>
          </div>
          <div className="clear"></div>
        </div> :
        <div className="link-container">
          <span className="link-title">{this.props.link.link_title}</span>
          <div className="flyout">
            <Dropdown
              className="link-button" 
              bsStyle="default"
              pullRight
              title=""
              id="dropdown-no-caret"
              >
              <Dropdown.Toggle
                noCaret
              >
                <Glyphicon glyph="option-horizontal" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem onClick={this.handleEdit}>
                  <img className="menu-action-image" src="/images/edit.svg" height="20" width="20" />
                  <span className="menu-action">Edit</span>
                </MenuItem>
                <MenuItem onClick={(e) => {this.removeLink(e, this.props.link.id)}}>
                  <img className="menu-action-image" src="/images/trash.svg" height="20" width="20" />
                  <span className="menu-action">Remove</span>
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      }
    </div>
  )
}

export default Link;