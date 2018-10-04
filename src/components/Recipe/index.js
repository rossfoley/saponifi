import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { round, set } from 'lodash';

import FormInput from './formInput';
import IngredientInput from './ingredientInput';
import { actions } from '../../reducers/recipes';
import { calculateLye } from '../../util/calculateLye';

class Recipe extends Component {
  onInputChange = (field) => (e) => {
    const value = e.target.value.trim();
    if (value !== '') {
      const updatedRecipe = set({}, field, parseFloat(value));
      this.props.updateRecipe(this.props.recipe.id, updatedRecipe);
    }
  }

  onIngredientChange = (index, name, amount) => {
    if (name.trim() !== '') {
      const updatedIngredient = { name: name.trim(), amount: parseFloat(amount) };
      this.props.updateIngredient(this.props.recipe.id, index, updatedIngredient);
    }
  }

  addNewIngredient = (e) => {
    this.props.addIngredient(this.props.recipe.id);
  }

  render() {
    const { recipe } = this.props;
    const lye = calculateLye(recipe.ingredients, recipe.setup);

    return (
      <div className="row">
        <div className="col-sm-9">
          <h1>{recipe.name} ({recipe.unit})</h1>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientInput
              ingredient={ingredient}
              onChange={this.onIngredientChange}
              key={ingredient.name}
              index={index}
            />
          ))}
          <button className="btn btn-default" onClick={this.addNewIngredient}>Add Ingredient</button>
          <h2>Recipe Setup</h2>
          <form className="form-horizontal">
            <FormInput
              inputId="naohRatio"
              type="number"
              value={recipe.setup.lyeRatio.naoh}
              label="NaOH Percent"
              onChange={this.onInputChange('setup.lyeRatio.naoh')}
            />
            <FormInput
              inputId="kohRatio"
              type="number"
              value={recipe.setup.lyeRatio.koh}
              label="KOH Percent"
              onChange={this.onInputChange('setup.lyeRatio.koh')}
            />
            <FormInput
              inputId="naohPurity"
              type="number"
              value={recipe.setup.lyePurity.naoh}
              label="NaOH Purity"
              onChange={this.onInputChange('setup.lyePurity.naoh')}
            />
            <FormInput
              inputId="kohPurity"
              type="number"
              value={recipe.setup.lyePurity.koh}
              label="KOH Purity"
              onChange={this.onInputChange('setup.lyePurity.koh')}
            />
            <FormInput
              inputId="superfatPercent"
              type="number"
              value={recipe.setup.superfatPercent}
              label="Superfat (% of oils)"
              onChange={this.onInputChange('setup.superfatPercent')}
            />
            <FormInput
              inputId="waterPercent"
              type="number"
              value={recipe.setup.waterPercent}
              label="Water (% of oils)"
              onChange={this.onInputChange('setup.waterPercent')}
            />
          </form>
        </div>
        <div className="col-sm-3">
          <h2>Calculated Lye</h2>
          <dl>
            <dt>NaOH</dt>
            <dd>{round(lye.naoh, 2)}</dd>

            <dt>KOH</dt>
            <dd>{round(lye.koh, 2)}</dd>

            <dt>Water</dt>
            <dd>{lye.water}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.recipe_id;
  return { recipe: state.recipes[recipeId] };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
