import React, { Component } from 'react';
import Item from './Item.js'

class List extends Component {

  render() {
    return (
      <div className="row">
        {this.props.messages.map((message, i) => <Item key={i} message={message}/>)}
      </div>
    )
  }

}
export default List;
