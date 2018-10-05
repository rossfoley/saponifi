import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { round, set } from 'lodash';

import PercentInput from './percentInput';
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

  onRatioChange = (type) => (e) => {
    const value = e.target.value.trim();
    if (value !== '') {
      const lyeRatio = {};
      lyeRatio[type] = value;
      if (type === 'naoh') {
        lyeRatio['koh'] = 100 - value;
      } else {
        lyeRatio['naoh'] = 100 - value;
      }
      this.props.updateRecipe(this.props.recipe.id, {setup: { lyeRatio }});
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
      <div className="row mt-3">
        <div className="col-sm-8">
          <div className="card mb-3">
            <h5 className="card-header">{recipe.name}</h5>
            <div className="card-body">
              {recipe.ingredients.map((ingredient, index) => (
                <IngredientInput
                  ingredient={ingredient}
                  onChange={this.onIngredientChange}
                  key={ingredient.name}
                  setup={recipe.setup}
                  index={index}
                />
              ))}
              <button className="btn btn-primary" onClick={this.addNewIngredient}>Add Ingredient</button>
            </div>
          </div>
          <div className="card">
            <h5 className="card-header">Recipe Setup</h5>
            <div className="card-body">
              <form className="form-horizontal">
                <PercentInput
                  inputId="naohRatio"
                  value={recipe.setup.lyeRatio.naoh}
                  label="NaOH Percent"
                  onChange={this.onRatioChange('naoh')}
                />
                <PercentInput
                  inputId="kohRatio"
                  value={recipe.setup.lyeRatio.koh}
                  label="KOH Percent"
                  onChange={this.onRatioChange('koh')}
                />
                <PercentInput
                  inputId="naohPurity"
                  value={recipe.setup.lyePurity.naoh}
                  label="NaOH Purity"
                  onChange={this.onInputChange('setup.lyePurity.naoh')}
                />
                <PercentInput
                  inputId="kohPurity"
                  value={recipe.setup.lyePurity.koh}
                  label="KOH Purity"
                  onChange={this.onInputChange('setup.lyePurity.koh')}
                />
                <PercentInput
                  inputId="superfatPercent"
                  value={recipe.setup.superfatPercent}
                  label="Superfat (% of oils)"
                  onChange={this.onInputChange('setup.superfatPercent')}
                />
                <PercentInput
                  inputId="waterPercent"
                  value={recipe.setup.waterPercent}
                  label="Water (% of oils)"
                  onChange={this.onInputChange('setup.waterPercent')}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card mb-3">
            <h5 className="card-header">Calculated Lye</h5>
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Sodium Hydroxide</td>
                    <td>{round(lye.naoh, 2)}</td>
                  </tr>
                  <tr>
                    <td>Potassium Hydroxide</td>
                    <td>{round(lye.koh, 2)}</td>
                  </tr>
                  <tr>
                    <td>Water</td>
                    <td>{round(lye.water, 2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
