import uniqid from 'uniqid';
import { merge } from 'lodash';

import { defaultSetup } from '../util/calculateLye';

const initialState = {
  '4n5pxq24kpiob12og9': {
    id: '4n5pxq24kpiob12og9',
    name: 'Test Recipe',
    unit: 'ounces',
    ingredients: [
      {
        name: 'Coconut Oil, 76 deg',
        amount: '100'
      }
    ],
    setup: defaultSetup
  }
};

const createRecipe = (name = 'Recipe Name') => {
  return {
    type: 'recipes.createRecipe',
    name
  };
};

const updateRecipe = (id, updatedRecipe) => {
  return {
    type: 'recipes.updateRecipe',
    id,
    updatedRecipe
  };
}

const addIngredient = (id) => {
  return {
    type: 'recipes.addIngredient',
    id
  };
};

const updateIngredient = (id, index, updatedIngredient) => {
  return {
    type: 'recipes.updateIngredient',
    id,
    index,
    updatedIngredient
  };
}

export const actions = {
  createRecipe,
  updateRecipe,
  addIngredient,
  updateIngredient
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recipes.createRecipe':
      const id = uniqid();

      return {
        ...state,
        [id]: {
          id,
          name: action.name,
          unit: 'ounces',
          ingredients: [],
          setup: {...defaultSetup}
        }
      };

    case 'recipes.updateRecipe':
      return {
        ...state,
        [action.id]: merge({...state[action.id]}, action.updatedRecipe)
      };

    case 'recipes.addIngredient':
      const recipe = {...state[action.id]};
      recipe.ingredients.push({name: '', amount: 0.0});

      return {
        ...state,
        [action.id]: recipe
      };

    case 'recipes.updateIngredient':
      const updatedRecipe = {...state[action.id]};
      updatedRecipe.ingredients[action.index] = action.updatedIngredient;

      return {
        ...state,
        [action.id]: updatedRecipe
      };

    default:
      return state;
  }
}
