import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormInput from './formInput';
import { actions } from '../../reducers/recipes';
import { calculateLye } from '../../util/calculateLye';

class Recipe extends Component {
  onChangeNaohRatio = (e) => {
    this.props.updateRecipe(this.props.recipe.id, {
      setup: {
        lyeRatio: {
          naoh: parseFloat(e.target.value)
        }
      }
    })
  }

  onChangeKohRatio = (e) => {
    this.props.updateRecipe(this.props.recipe.id, {
      setup: {
        lyeRatio: {
          koh: parseFloat(e.target.value)
        }
      }
    })
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
            onChange={this.onChangeNaohRatio}
          />
          <FormInput
            inputId="kohRatio"
            type="number"
            value={recipe.setup.lyeRatio.koh}
            label="Potassium Hydroxide Percent"
            onChange={this.onChangeKohRatio}
          />
        </form>
        <h2>Calculated Lye</h2>
        <dl>
          <dt>NaOH</dt>
          <dd>{lye.naoh}</dd>

          <dt>KOH</dt>
          <dd>{lye.koh}</dd>

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
