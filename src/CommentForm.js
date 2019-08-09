import React, { Component } from 'react';
import uuid from 'react-uuid';
import { connect } from "react-redux"
import { addComment, getCommentsFromAPI } from "./actions"


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    let post_id = this.props.postId
    this.props.getCommentsFromAPI(post_id); //can call this in postDetail
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let newComment = { text: this.state.comment, postId: this.props.postId, id: uuid() }
    this.props.addComment(newComment)

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
const mapDispatchToProps = { addComment, getCommentsFromAPI }
export default connect(null, mapDispatchToProps)(CommentForm);