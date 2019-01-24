import React, { Component } from 'react';

class Item extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            <h3>{this.props.message.name}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9">
            <p>{this.props.message.message}</p>
          </div>
        </div>
      </div>
    )
  }

}
export default Item;
