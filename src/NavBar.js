import React, { Component } from 'react';
// import "./NavBar.css";
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem} from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <div>

        <Navbar expand="lg" variant="light" bg="light" className="flex-column">
  
            <Navbar.Brand ><h3>Microblog</h3></Navbar.Brand>
            <NavItem>
              <Navbar.Brand >Get in the rithm of blogging</Navbar.Brand>
            </NavItem>

            <NavItem>
              <NavLink to="/">Blog</NavLink>
            </NavItem>
              
            <NavItem>
              <NavLink to="/new">Add a new post</NavLink>
            </NavItem>

        </Navbar>

  

      </div>
    );
  }
}

export default NavBar;