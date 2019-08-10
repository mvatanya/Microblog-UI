import React, { Component } from 'react';
import { connect } from "react-redux"
import { addCommentToAPI, getCommentsFromAPI } from "./actions"


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount(){
    let post_id = this.props.postId
    await this.props.getCommentsFromAPI(post_id); //can call this in postDetail
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log(" commentting to postID:", this.props.postId)
    let newComment = { text: this.state.comment, postId: this.props.postId }
    await this.props.addCommentToAPI(newComment)

    this.setState({comment: ""})
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  render() {

    return (
      <div>
        <div>New Comments</div>
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
const mapDispatchToProps = { addCommentToAPI, getCommentsFromAPI }
export default connect(null, mapDispatchToProps)(CommentForm);