import React, {Component} from 'react';

class Composing extends Component {

  render() {
    return (<div className="row">
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" required="required"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Message</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" required="required"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input onClick={(e) => this.props.handlePost(e)} type="submit" value="Compose" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
    </div>)
  }

}
export default Composing;
