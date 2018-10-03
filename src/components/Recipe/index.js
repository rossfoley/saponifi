import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { round, set } from 'lodash';

import FormInput from './formInput';
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

  render() {
    const { recipe } = this.props;
    const lye = calculateLye(recipe.ingredients, recipe.setup);

    return (
      <div>
        <h1>{recipe.name}</h1>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name}>{ingredient.name} - {ingredient.amount}</li>
          ))}
        </ul>
        <h2>Recipe Setup</h2>
        <form className="form-horizontal">
          <FormInput
            inputId="naohRatio"
            type="number"
            value={recipe.setup.lyeRatio.naoh}
            label="Sodium Hydroxide Percent"
            onChange={this.onInputChange('setup.lyeRatio.naoh')}
          />
          <FormInput
            inputId="kohRatio"
            type="number"
            value={recipe.setup.lyeRatio.koh}
            label="Potassium Hydroxide Percent"
            onChange={this.onInputChange('setup.lyeRatio.koh')}
          />
          <FormInput
            inputId="naohPurity"
            type="number"
            value={recipe.setup.lyePurity.naoh}
            label="Sodium Hydroxide Purity"
            onChange={this.onInputChange('setup.lyePurity.naoh')}
          />
          <FormInput
            inputId="kohPurity"
            type="number"
            value={recipe.setup.lyePurity.koh}
            label="Potassium Hydroxide Purity"
            onChange={this.onInputChange('setup.lyePurity.koh')}
          />
          <FormInput
            inputId="superfatPercent"
            type="number"
            value={recipe.setup.superfatPercent}
            label="Superfat Percent"
            onChange={this.onInputChange('setup.superfatPercent')}
          />
          <FormInput
            inputId="waterPercent"
            type="number"
            value={recipe.setup.waterPercent}
            label="Water Percent"
            onChange={this.onInputChange('setup.waterPercent')}
          />
        </form>
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
