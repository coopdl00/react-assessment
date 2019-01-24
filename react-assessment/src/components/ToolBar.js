import React, { Component } from 'react';

class ToolBar extends Component {

  render() {
    return (
      <div className="row">
        <button className="btn btn-danger" onClick={() => this.props.toggleComposing()}>
          New
          <i className="fa fa-plus"></i>
        </button>
      </div>
    )
  }

}
export default ToolBar;
