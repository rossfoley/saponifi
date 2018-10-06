import uniqid from 'uniqid';
import { merge, sumBy } from 'lodash';

import { defaultSetup } from '../util/calculateLye';

const initialState = {
  '4n5pxq24kpiob12og9': {
    id: '4n5pxq24kpiob12og9',
    name: 'Test Recipe',
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

const updateRecipeLye = (id, type, newPercent) => {
  const lyeRatio = {};

  switch (type) {
    case 'naoh':
      lyeRatio['naoh'] = newPercent;
      lyeRatio['koh'] = 100 - newPercent
      break;

    case 'koh':
      lyeRatio['naoh'] = 100 - newPercent;
      lyeRatio['koh'] = newPercent
      break;

    default:
      console.log(`Unknown lye type: ${type}`);
      break;
  }

  return updateRecipe(id, { setup: { lyeRatio } });
}

const updateRecipeMode = (id, modeField, value) => {
  return {
    type: 'recipes.updateRecipeMode',
    id,
    modeField,
    value
  }
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
  updateRecipeLye,
  updateRecipeMode,
  addIngredient,
  updateIngredient
};

const convertTo = {
  ounces: (grams) => grams / 28.3495,
  grams: (ounces) => ounces * 28.3495
};

const displayUnits = (recipe) => {
  const { inputMode, outputUnits } = recipe.setup;
  if (inputMode === 'percent') {
    return '%';
  } else {
    if (outputUnits === 'ounces') {
      return 'oz';
    } else {
      return 'g';
    }
  }
}

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

    case 'recipes.updateRecipeMode':
      const prevRecipe = {...state[action.id]};
      prevRecipe.setup[action.modeField] = action.value;
      prevRecipe.setup.displayUnits = displayUnits(prevRecipe);

      if (action.modeField === 'inputMode') {
        if (action.value === 'percent') {
          const totalWeight = sumBy(prevRecipe.ingredients, 'amount');
          prevRecipe.ingredients = prevRecipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: (ingredient.amount / totalWeight) * 100
          }));
          prevRecipe.setup.totalWeight = totalWeight;
        } else if (action.value === 'weight') {
          prevRecipe.ingredients = prevRecipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: (ingredient.amount / 100) * prevRecipe.setup.totalWeight
          }));
        }
      } else if (action.modeField === 'outputUnits') {
        prevRecipe.setup.totalWeight = convertTo[action.value](prevRecipe.setup.totalWeight);
        if (prevRecipe.setup.inputMode === 'weight') {
          prevRecipe.ingredients = prevRecipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: convertTo[action.value](ingredient.amount)
          }));
        }
      }

      return {
        ...state,
        [action.id]: prevRecipe
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
