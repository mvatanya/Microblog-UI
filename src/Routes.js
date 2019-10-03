import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home"
import PostDetail from "./PostDetail"
import NewPostForm from "./NewPostForm"



class Routes extends Component {

  render(){

    return (
    <Switch>
      <Route exact path="/"
        render={() => <Home posts={this.props.posts} />} />

      <Route exact path="/new"
        render={(rtprops) => <NewPostForm {...rtprops}/>} /> 

      <Route path="/:id"
        render={(props) => <PostDetail
          cantFind="/"
          {...props} />} />

      {/* when page is not found return 404 message */}
      <Route>
        <h3 className="text-red">Oops, you're in 404 land.</h3>
      </Route>

    </Switch>
    )
  }
}

export default Routes;