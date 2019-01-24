import React, {Component} from 'react';

class Editing extends Component {

  render() {
    return (<div className="row">
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Edit Message</h4><h4 id="id"> </h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Message</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Edit" className="btn btn-primary" onClick={(e) => this.props.handleEdit(e, document.querySelector('#id').innerHTML, document.querySelector('#subject').value, document.querySelector('#body').value)}></input>
          </div>
          <div>
            <button className="btn btn-danger" onClick={(e) => this.props.toggleEdit()}>Cancel</button>
          </div>
        </div>
      </form>
    </div>)
  }

}
export default Editing;
