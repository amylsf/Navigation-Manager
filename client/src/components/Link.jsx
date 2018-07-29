import React, { Component } from 'react';
import axios from 'axios';
import { DropdownButton, MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';


class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link_title: this.props.link.link_title,
      link_url: this.props.link.link_url,
      showFlyout: false,
      cardIsOpen: false
    }
  }

  handleClick = () => {
    this.setState({
      showFlyout: !this.state.showFlyout
    })
  }

  handleEdit = () => {
    this.setState({
      cardIsOpen: !this.state.cardIsOpen,
      showFlyout: false
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
          <div className="back-button" onClick={this.handleEdit}>{"<"}</div>
          <br/>
          <div className="input-form">
            <form autoComplete="off">
              <div>Link title</div>
              <input className="link-input" name="link_title" type="text" value={this.state.link_title} maxLength={45} onChange={(e) => {this.handleChange(e)}}/>
              <br/>
              <div>Link url</div>
              <input className="link-input" name="link_url" type="text" value={this.state.link_url} onChange={(e) => {this.handleChange(e)}}/>
            </form>
          </div>
        </div> :
        <div className="link-container">
          <span className="link-title">{this.props.link.link_title}</span>
          <div className="flyout">
            <Dropdown
              className="link-button" 
              onClick={this.handleClick}
              bsStyle="default"
              pullRight
              title=''
              id="dropdown-no-caret"
              >
              <Dropdown.Toggle
                noCaret
              >
                <Glyphicon
                  glyph="option-horizontal"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                <MenuItem onClick={(e) => {this.removeLink(e, this.props.link.id)}}>Remove</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      }
    </div>
  )
}

export default Link;