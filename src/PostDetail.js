import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CommentForm from './CommentForm'
import { connect } from "react-redux"
import EditPostForm from "./EditPostForm";
import { getPostFromAPI, getCommentsFromAPI, removePostFromAPI, sendVoteUpToAPI, sendVoteDownToAPI } from "./actions"

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode:false
    };
    this.turnOnEditMode = this.turnOnEditMode.bind(this)
    this.turnOffEditMode = this.turnOffEditMode.bind(this)
    this.handleClickX = this.handleClickX.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleUnlike = this.handleUnlike.bind(this)
  }  

  async componentDidMount(){
    let id = this.props.match.params.id
    await this.props.getPostFromAPI(id);
  }

  turnOnEditMode(){
    return this.setState({editMode: true})
  }

  turnOffEditMode(){
    return this.setState({editMode: false})
  }

  handleClickX(){
    let id = this.props.match.params.id;
    this.props.removePostFromAPI(id)
  }

  handleLike(){
    let id = this.props.match.params.id;
    this.props.sendVoteUpToAPI(id)
  }

  handleUnlike(){
    let id = this.props.match.params.id;
    this.props.sendVoteDownToAPI(id);
  }

  render() {
    const postId = this.props.match.params.id;
    let posts = this.props.posts
    let post = posts[postId]

    //if no post is found, redirect to cantFind route which this case will be /
    if (!post) return <Redirect to={this.props.cantFind} />;
    let { comments } = this.props

    const allComments = Object.keys(comments).map(id => {
      if (this.props.comments[id].postId === postId) {
        const comment = comments[id]
        return (
          <li key={id}>{comment.text}</li>
        );
      }
      return null
    }
    )
    
    // allComments will have null when postId is not match postId. 
    // this is to filter out null (this actually not necessary because it won't render out null or undefine anyway)
    let matchPostComment = allComments.filter(comment => comment)
 
    return (

      <div className= "m-4">
        <h2>{post.title}</h2>
        <div className="float-right">
          <span className="mr-2"> votes: {post.votes}</span>
          <span onClick={this.handleLike} className="mr-2"><i className="fas fa-thumbs-up text-success"></i></span>
          <span onClick={this.handleUnlike}><i className="fas fa-thumbs-down text-danger"></i></span>
        </div>
        <h4>{post.description}</h4>
        <div>{post.body}</div>
        <div className="mt-3"><b>Comments</b></div>
        <ul>{matchPostComment}</ul>
        <div><CommentForm postId={postId} /></div>
        <div className="mt-3">
          <button onClick={this.turnOnEditMode} className="btn btn-primary mr-1">Edit</button>
          <button onClick={this.handleClickX} className="btn btn-primary">Delete</button>
        </div>
        {this.state.editMode && (<div><EditPostForm id={this.props.match.params.id} turnOffEditMode={this.turnOffEditMode}/></div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, comments: state.comments}; //TODO: add votes: state.votes 
}

const mapDispatchToProps = { removePostFromAPI, getPostFromAPI, getCommentsFromAPI, sendVoteUpToAPI, sendVoteDownToAPI }

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)