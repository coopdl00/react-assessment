import React, { Component } from 'react';

class ToolBar extends Component {

  render() {
    return (
      <div className="row">
        <h1 className="text-center">React-ssessment</h1>
        <button className="btn btn-danger" onClick={() => this.props.toggleComposing()}>
          New
          <i className="fa fa-plus"></i>
        </button>
      </div>
    )
  }

}
export default ToolBar;
