import React, { Component } from 'react';
import axios from 'axios';
import Link from './Link.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, start, end) => {
  const removed = list.splice(start, 1);
  list.splice(end, 0, removed);
  return list;
}

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

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.links,
      result.source.index,
      result.destination.index
    );

    this.setState({
      links: items
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div className="nav-container" ref={provided.innerRef}>
            <div className="nav-header">
              <span>Navigation</span>
              <span className="nav-button" onClick={this.handleClick}>+ item</span>
            </div>
            {this.state.links.map((link) => {
              return (
                <Draggable key={link.id} index={link.index} draggableId={link.id}>
                {(provided, snapshot) => (
                  <div key={link.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <Link 
                      link={link}
                      fetchLinks={this.fetchLinks}
                    />
                  </div>
                )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default Navigation;