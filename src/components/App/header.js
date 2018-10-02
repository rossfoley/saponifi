import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

class AppHeader extends Component {
  render() {
    return (
      <header>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Saponifi</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <ul className="nav navbar-nav">
            <p className="navbar-text">
              <Link to="/">Home</Link>
            </p>
            <p className="navbar-text">
              <Link to="/recipes">Recipes</Link>
            </p>
          </ul>
        </Navbar>
      </header>
    );
  }
}

export default AppHeader;
