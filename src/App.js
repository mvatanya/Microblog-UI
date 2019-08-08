import React, {Component} from 'react'
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./Home"
import PostDetail from "./PostDetail"
import NewPostForm from "./NewPostForm"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }
  render() {
    return(
      <div className="App">
        <NavBar />
        <main>
          <Switch>

            <Route exact path="/"
              render={() => <Home posts={this.state.posts}/>} />

            <Route exact path="/new"
              render={() => <NewPostForm />} /> 

            <Route exact path="/post"
              render={() => <PostDetail />} /> 

            <Route path="/:id"
              render={(props) => <PostDetail
                cantFind="/"
                {...props} />} />

            {/* when page is not found return 404 message */}
            <Route>
              <h3 className="text-white">Oops, you're in 404 land.</h3>
            </Route>

          </Switch>
        </main>
      </div>
    )
  }
}

export default App;

