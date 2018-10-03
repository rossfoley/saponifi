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

export const actions = {
  createRecipe,
  updateRecipe
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

    default:
      return state;
  }
}
