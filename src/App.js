import React, {Component} from 'react'
import NavBar from "./NavBar";
import Routes from "./Routes";

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
        <NavBar/>
        <main>
          <Routes posts={this.state.posts} />
        </main>
      </div>
    )
  }
}

export default App;

