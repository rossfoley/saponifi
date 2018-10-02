import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppHeader from './header';
import Home from '../Home';
import Recipe from '../Recipe';
import RecipesList from '../RecipesList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <AppHeader />

          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={RecipesList} />
            <Route exact path="/recipes/:recipe_id" component={Recipe} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
