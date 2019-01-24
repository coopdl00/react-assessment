import React, {Component} from 'react';

class Item extends Component {

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-xs-3">
          <h3>{this.props.message.name}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-9">
          <p className="">{this.props.message.message}</p>
        </div>
        <div className="col-xs-3">
          <div className="row">
            <div className="col-xs-4">
              <button className="btn btn-default" onClick={() => {
                  this.props.handleDelete(this.props.message.id)
                }}>
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
            <div className="col-xs-2">
              <button className="btn btn-default" onClick={() => {
                  this.props.toggleEdit()
                }}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

}
export default Item;
