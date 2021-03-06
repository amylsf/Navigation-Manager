import React, { Component } from 'react';
import axios from 'axios';
import Link from './Link.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import debounce from 'lodash.debounce';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    }

    //added debounce to limit API calls made when updating link title and url
    this.updateLink = debounce(this.updateLink, 500);
  }

  componentDidMount = () => {
    this.fetchLinks();
  }

  //adds an empty link to database when you click + item
  addLink = () => {
    let index = this.state.links.length;
    axios.post('/navigation', {
      link: {
        link_title: '',
        link_url: '',
        index: index
      }
    })
    .then(() => {
      this.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //retrieves all links
  fetchLinks = (cb) => {
    axios.get('/navigation')
    .then(({data}) => [
      this.setState({
        links: data.slice(0, 5) //added another check just in case
      }, () => {
        if (cb) {
          cb();
        }
      })
    ])
    .catch((err) => {
      console.log(err);
    })
  }

  //allows you to add a link as long as you have under 5 links
  handleClick = () => {
    if (this.state.links.length < 5) {
      this.addLink();
    }
  }

  //updates state with new list order upon drag and drop reordering
  reorderList = (start, end) => {
    let links = this.state.links.slice();
    let dragCard = links[start];
    links.splice(start, 1);
    links.splice(end, 0, dragCard);
    this.setState({
      links: links
    }, () => {
      this.updateAllLinks();
    })
  }

  //handles "drop"
  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    this.reorderList(
      result.source.index,
      result.destination.index
    );
  }

  //updates link info when you type into input box
  updateLink = (id, title, url, index) => {
    axios.put('/navigation', {
      link: {
        id: id,
        link_title: title,
        link_url: url,
        index: index
      }
    })
    .then(() => {
      this.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //updates the indices for all links 
  updateAllLinks = () => {
    this.state.links.forEach((link, index) => {
      this.updateIndex(link.id, index);
    })
  }

  //updates the index in database for a single link
  updateIndex = (id, index) => {
    axios.put('/navigation', {
      link: {
        id: id,
        index: index
      },
    })
    .then(() => {
      this.fetchLinks();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render = () => (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="nav-container">
        <div className="nav-header">
          <span>Navigation</span>
          <span className="nav-button" onClick={this.handleClick}>+ item</span>
        </div>
        {this.state.links.length !== 0 ?
          <div className="links-container">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} >
                {this.state.links.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided, snapshot) => {
                      const style = {
                        boxShadow: snapshot.isDragging ? '0px 10px 20px 0px rgba(0, 0, 0, 0.19)' : null,
                        border: snapshot.isDragging ? '1px solid rgba(0, 0, 0, 0.85)' : null
                      }
                      return (
                        <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        >
                          <Link 
                            key={link.id}
                            link={link}
                            fetchLinks={this.fetchLinks}
                            updateLink={this.updateLink}
                            links={this.state.links}
                            index={index}
                            updateAll={this.updateAllLinks}
                            style={style}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div> : 
          <div className="no-links-msg">Add a link to get started!</div>
        }
      </div>
    </DragDropContext>
  )
}

export default Navigation;