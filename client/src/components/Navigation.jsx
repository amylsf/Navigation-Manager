import React, { Component } from 'react';
import axios from 'axios';
import Link from './Link.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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
    this.onDragEnd = this.onDragEnd.bind(this);
    this.reorderList = this.reorderList.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.updateAllLinks = this.updateAllLinks.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.onDragUpdate = this.onDragUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchLinks();
  }

  addLink() {
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

  fetchLinks(cb) {
    axios.get('/navigation')
    .then(({data}) => [
      this.setState({
        links: data
      }, () => {
        console.log(this.state.links);
        if (cb) {
          cb();
        }
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

  reorderList(start, end) {
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

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.reorderList(
      result.source.index,
      result.destination.index
    );
  }

  onDragUpdate(result) {
    console.log('calling', result)
  }

  updateLink(id, title, url, index) {
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

  updateAllLinks() {
    this.state.links.forEach((link, index) => {
      this.updateIndex(link.id, index);
    })
  }

  updateIndex(id, index) {
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

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate} >
        <div className="nav-container">
          <div className="nav-header">
            <span>Navigation</span>
            <span className="nav-button" onClick={this.handleClick}>+ item</span>
          </div>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} >
              {provided.placeholder}
              {this.state.links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided, snapshot) => (
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
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
            </div>
          )}
        </Droppable>
        </div>
      </DragDropContext>
    )
  }
}

export default Navigation;