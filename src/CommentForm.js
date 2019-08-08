import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import { connect } from "react-redux"


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(evt) {
    evt.preventDefault();
    let newComment = { id: uuid(), comment: this.state.comment, postId: this.props.postId }
    this.props.dispatch({ type: "ADD_COMMENT", newComment: newComment })

    this.setState({comment: ""})
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  render() {

    return (
      <div>
        <div>Comments</div>
        <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  id="comment"
                  name="comment"
                  className="form-control"
                  placeholder="New comment"
                  value={this.state.comment}
                  onChange={this.handleChange}
                />
              </div>
              <button>Add</button>
          </form>
      </div>
    );
  }
}

export default connect()(CommentForm);