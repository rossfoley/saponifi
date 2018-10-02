import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class RecipesList extends Component {
  render() {
    const recipes = Object.values(this.props.recipes);

    return (
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps)(RecipesList);
