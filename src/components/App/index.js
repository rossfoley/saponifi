import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Home from '../Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <h1>Saponifi</h1>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
              </ul>
            </nav>
          </header>

          <hr />

          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
