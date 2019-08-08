import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardColumns, Button } from "react-bootstrap";
import { removePost } from "./actions"


class Home extends Component {
  constructor(props) {
    super(props);

    this.handleClickX = this.handleClickX.bind(this)
  }

  handleClickX(evt){
    let id = evt.target.id
    this.props.removePost(id)
  }

  
  render() {
    let { posts } = this.props
    const allPosts = Object.keys(this.props.posts).map(id => {
      const post = posts[id]
    
      return (
        <Link to={id} key={id}>
        <Card  style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
          </Card.Body>
          <Button onClick={this.handleClickX} id={id}>X</Button>
        </Card>
        </Link>
      
      );

    })
    return(
      <div>
        <div>Welcome to Microblog</div>
        <CardColumns>{allPosts}</CardColumns>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {posts: state.posts};
}

const mapDispatchToProps = { removePost }



export default connect(mapStateToProps, mapDispatchToProps)(Home);

