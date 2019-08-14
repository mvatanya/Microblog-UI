import React, { Component } from 'react';
// import "./NavBar.css";
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem} from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" variant="light" bg="light" className="flex-column ml-4 m-4 pt-5 pb-5">            
            <Navbar.Brand className="mr-auto" ><h3 className="display-4">Microblog</h3></Navbar.Brand>
            <NavItem className="mr-auto mb-3">
              <Navbar.Brand >Get in the rithm of blogging</Navbar.Brand>
            </NavItem>

            <NavItem className="mr-auto">
              <NavLink className="mr-4" to="/">Blog</NavLink>
              <NavLink to="/new">Add a new post</NavLink>
            </NavItem>

        </Navbar>
  

      </div>
    );
  }
}

export default NavBar;