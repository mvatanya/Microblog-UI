import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardColumns } from "react-bootstrap";
import { removePostFromAPI, getPostsFromAPI, sendVoteUpToAPI, sendVoteDownToAPI } from "./actions"


class Home extends Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this)
    this.handleUnlike = this.handleUnlike.bind(this)
  }
  async componentDidMount(){
    
    await this.props.getPostsFromAPI();
  }

  handleLike(evt){
    let id = evt.target.id;
    this.props.sendVoteUpToAPI(id)
  }

  handleUnlike(evt){
    let id = evt.target.id;
    this.props.sendVoteDownToAPI(id);
  }

  render() {
    let { posts } = this.props
    const allPosts = Object.keys(posts).map(id => {
      const post = posts[id]
    
      return (
        <Card key={id}>
          <Link to={id} >
          <Card.Body>
            <Card.Title className="mt-3 mb-3">{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.description}</Card.Subtitle>
          </Card.Body>
        </Link>
          <Card.Footer className="text-muted">
            <span className="mr-2">votes: {post.votes}</span>
            <span onClick={this.handleLike} className="mr-2"><i id={id} className="fas fa-thumbs-up text-success"></i></span>
            <span onClick={this.handleUnlike}><i id={id} className="fas fa-thumbs-down text-danger"></i></span>
          </Card.Footer>
        </Card>
      
      );

    })
    return(
      <div className="m-4">
        <div className="mb-3">Welcome to Microblog, our innovative site for communicating on the information superhighway.</div>
        <CardColumns>{allPosts}</CardColumns>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {titles: state.titles, posts: state.posts};
}

const mapDispatchToProps = { removePostFromAPI, getPostsFromAPI, sendVoteUpToAPI, sendVoteDownToAPI }



export default connect(mapStateToProps, mapDispatchToProps)(Home);

