import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardColumns, Button } from "react-bootstrap";
import { removePostFromAPI, getPostsFromAPI } from "./actions"


class Home extends Component {
  constructor(props) {
    super(props);

    this.handleClickX = this.handleClickX.bind(this)
  }
  async componentDidMount(){
    
    await this.props.getPostsFromAPI();
  }

  handleClickX(evt){
    let id = evt.target.id
    this.props.removePostFromAPI(id)
  }

  
  render() {
    let { posts } = this.props
    const allPosts = Object.keys(posts).map(id => {
      const post = posts[id]
    
      return (
        <Link to={id} key={id}>
        <Card  >
          <Card.Body>
            <Card.Title className="mt-3 mb-3">{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer className="text-muted">votes: {post.votes}</Card.Footer>
          {/* <Button onClick={this.handleClickX} id={id} className="btn-outline-light">X</Button> */}
        </Card>
        </Link>
      
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

const mapDispatchToProps = { removePostFromAPI, getPostsFromAPI }



export default connect(mapStateToProps, mapDispatchToProps)(Home);

