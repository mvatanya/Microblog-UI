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
    let { titles } = this.props
    const allTitles = Object.keys(this.props.titles).map(id => {
      const title = titles[id]
    
      return (
        <Link to={id} key={id}>
        <Card  style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{title.title}</Card.Title>
            <Card.Text>{title.description}</Card.Text>
          </Card.Body>
          <Button onClick={this.handleClickX} id={id}>X</Button>
        </Card>
        </Link>
      
      );

    })
    return(
      <div>
        <div>Welcome to Microblog</div>
        <CardColumns>{allTitles}</CardColumns>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {titles: state.titles, posts: state.posts};
}

const mapDispatchToProps = { removePostFromAPI, getPostsFromAPI }



export default connect(mapStateToProps, mapDispatchToProps)(Home);

