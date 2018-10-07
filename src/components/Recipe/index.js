import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { round, set, sumBy } from 'lodash';

import PercentInput from './percentInput';
import NumberInput from './numberInput';
import IngredientInput from './ingredientInput';
import { actions } from '../../reducers/recipes';
import { calculateLye } from '../../util/calculateLye';

class Recipe extends Component {
  addNewIngredient = (e) => {
    this.props.addIngredient(this.props.recipe.id);
  }

  onIngredientChange = (index, name, amount, superfat) => {
    if (name.trim() !== '') {
      const updatedIngredient = { name: name.trim(), amount: parseFloat(amount), superfat };
      this.props.updateIngredient(this.props.recipe.id, index, updatedIngredient);
    }
  }

  onIngredientRemove = (index) => {
    this.props.removeIngredient(this.props.recipe.id, index);
  }

  onInputChange = (field) => (e) => {
    const value = e.target.value.trim();
    if (value !== '') {
      const updatedRecipe = set({}, field, parseFloat(value));
      this.props.updateRecipe(this.props.recipe.id, updatedRecipe);
    }
  }

  onModeChange = (field) => (e) => {
    this.props.updateRecipeMode(this.props.recipe.id, field, e.target.value);
  }

  onRatioChange = (type) => (e) => {
    const value = e.target.value.trim();
    if (value !== '') {
      this.props.updateRecipeLye(this.props.recipe.id, type, value);
    }
  }

  render() {
    const { recipe } = this.props;
    const lye = calculateLye(recipe.ingredients, recipe.setup);
    const totalWeight = recipe.setup.inputMode === 'weight' ?
      sumBy(recipe.ingredients, 'amount') :
      recipe.setup.totalWeight;
    const superfatIngredients = recipe.ingredients.filter(({superfat}) => superfat);
    const superfatDisabled = superfatIngredients.length > 0;
    const calculatedSuperfat = round(sumBy(superfatIngredients, 'amount') / totalWeight * 100, 2);

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
                  onRemove={this.onIngredientRemove}
                  key={ingredient.name}
                  setup={recipe.setup}
                  index={index}
                />
              ))}
              <button className="btn btn-primary ml-3" onClick={this.addNewIngredient}>Add Ingredient</button>
            </div>
          </div>
          <div className="card mb-3">
            <h5 className="card-header">Recipe Setup</h5>
            <div className="card-body">
              <PercentInput
                inputId="superfatPercent"
                value={superfatDisabled ? calculatedSuperfat : recipe.setup.superfatPercent}
                disabled={superfatDisabled}
                label="Superfat (% of oils)"
                onChange={this.onInputChange('setup.superfatPercent')}
              />
              <PercentInput
                inputId="waterPercent"
                value={recipe.setup.waterPercent}
                label="Water (% of oils)"
                onChange={this.onInputChange('setup.waterPercent')}
              />
              <NumberInput
                inputId="totalWeight"
                value={totalWeight}
                disabled={recipe.setup.inputMode === 'weight'}
                label="Total Weight"
                units={recipe.setup.displayUnits.output}
                onChange={this.onInputChange('setup.totalWeight')}
              />
              <div className="form-group row">
                <div className="col-sm-3">Input Mode</div>
                <div className="col-sm-9">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inputMode"
                      id="inputMode1"
                      value="weight"
                      checked={recipe.setup.inputMode === 'weight'}
                      onChange={this.onModeChange('inputMode')}
                    />
                    <label className="form-check-label" htmlFor="inputMode1">Weight</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inputMode"
                      id="inputMode2"
                      value="percent"
                      checked={recipe.setup.inputMode === 'percent'}
                      onChange={this.onModeChange('inputMode')}
                    />
                    <label className="form-check-label" htmlFor="inputMode2">Percent</label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-3">Units</div>
                <div className="col-sm-9">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="outputUnits"
                      id="outputUnits1"
                      value="ounces"
                      checked={recipe.setup.outputUnits === 'ounces'}
                      onChange={this.onModeChange('outputUnits')}
                    />
                    <label className="form-check-label" htmlFor="outputUnits1">Ounces</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="outputUnits"
                      id="outputUnits2"
                      value="grams"
                      checked={recipe.setup.outputUnits === 'grams'}
                      onChange={this.onModeChange('outputUnits')}
                    />
                    <label className="form-check-label" htmlFor="outputUnits2">Grams</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h5 className="card-header">Lye Setup</h5>
            <div className="card-body">
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
                    <td>{round(lye.naoh, 2)} {recipe.setup.displayUnits.output}</td>
                  </tr>
                  <tr>
                    <td>Potassium Hydroxide</td>
                    <td>{round(lye.koh, 2)} {recipe.setup.displayUnits.output}</td>
                  </tr>
                  <tr>
                    <td>Water</td>
                    <td>{round(lye.water, 2)} {recipe.setup.displayUnits.output}</td>
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
