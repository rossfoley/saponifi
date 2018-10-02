import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipe extends Component {
  render() {
    const { recipe } = this.props;

    return (
      <div>
        <h1>Recipe for {recipe.name}</h1>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name}>{ingredient.name} - {ingredient.amount}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.recipe_id;
  return { recipe: state.recipes[recipeId] };
}

export default connect(mapStateToProps)(Recipe);
