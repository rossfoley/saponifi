import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppHeader extends Component {
  render() {
    return (
      <header className="mb-3">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Saponifi</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarMain">
            <div className="navbar-nav mr-auto">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/recipes" className="nav-item nav-link">Recipes</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
