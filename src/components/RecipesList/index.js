import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../reducers/recipes';

class RecipesList extends Component {
  onCreateRecipe = (e) => {
    e.preventDefault();
    this.props.createRecipe(this.recipeNameInput.value);
    this.recipeNameInput.value = '';
  }

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
        <div className="form-inline">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            ref={(r) => this.recipeNameInput = r} />
          <input
            type="submit"
            className="btn btn-default"
            onClick={this.onCreateRecipe} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { recipes: state.recipes };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
