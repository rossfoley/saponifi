import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Home from '../Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
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
              </ul>
            </Navbar>
          </header>

          <main>
            <Route exact path="/" component={Home} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
