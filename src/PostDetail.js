import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CommentForm from './CommentForm'
import { connect } from "react-redux"
import EditPostForm from "./EditPostForm";
import { removePost } from "./actions"


class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode:false
    };
    this.turnOnEditMode = this.turnOnEditMode.bind(this)
    this.turnOffEditMode = this.turnOffEditMode.bind(this)
    this.handleClickX = this.handleClickX.bind(this)
  }  

  turnOnEditMode(){
    return this.setState({editMode: true})
  }

  turnOffEditMode(){
    return this.setState({editMode: false})
  }

  handleClickX(){
    let id = this.props.match.params.id
    // this.props.dispatch({ type: "REMOVE_POST", id: this.props.match.params.id})
    this.props.removePost(id)
  }

  render() {
    const postId = this.props.match.params.id;
    let posts = this.props.posts
    let post = posts[postId]

    //if no post is found, redirect to cantFind route which this case will be /
    if (!post) return <Redirect to={this.props.cantFind} />;
    let { comments } = this.props

    const allComments = Object.keys(this.props.comments).map(id => {
      if (this.props.comments[id].postId === postId) {
        const comment = comments[id]
        return (
          <li key={id}>{comment.comment}</li>
        );
      }
      return null
    }
    )
    
    // allComments will have null when postId is not match postId. 
    // this is to filter out null (this actually not necessary because it won't render out null or undefine anyway)
    let matchPostComment = allComments.filter(comment => comment)
 
    return (

      <div>
        <h2>{post.title}</h2>
        <h4>{post.description}</h4>
        <div>{post.body}</div>
        <ul>{matchPostComment}</ul>
        <div><CommentForm postId={postId} /></div>
        <button onClick={this.turnOnEditMode}>Edit</button>
        <button onClick={this.handleClickX}>Delete</button>
        {this.state.editMode && (<div><EditPostForm id={this.props.match.params.id} turnOffEditMode={this.turnOffEditMode}/></div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, comments: state.comments };
}

const mapDispatchToProps = { removePost }

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)