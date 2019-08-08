import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CommentForm from './CommentForm'
import { connect } from "react-redux"
import EditForm from "./EditForm";


class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode:false
    };
    this.toggleEdit = this.toggleEdit.bind(this)
    this.editMode = this.editMode.bind(this)
    this.handleClickX = this.handleClickX.bind(this)
  }  

  toggleEdit(){
    return this.setState({editMode: !this.state.editMode})
  }

  editMode(mode){
    return this.setState({editMode: mode})
  }

  handleClickX(){
    this.props.dispatch({ type: "REMOVE_POST", id: this.props.match.params.id})
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
        {/* <div><CommentsListContainer /></div> */}
        <ul>{matchPostComment}</ul>
        <div><CommentForm postId={postId} /></div>
        <button onClick={this.toggleEdit}>Edit</button>
        <button onClick={this.handleClickX}>Delete</button>
        {this.state.editMode && (<div><EditForm id={this.props.match.params.id} editMode={this.editMode}/></div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('redux state....', state)
  return { posts: state.posts, comments: state.comments };
}

const connectToState = connect(mapStateToProps)

export default connectToState(PostDetail);