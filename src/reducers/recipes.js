import uniqid from 'uniqid';
import { merge, round, sumBy } from 'lodash';

const initialState = {};

export const defaultSetup = {
  lyeRatio: {
    naoh: 100,
    koh: 0
  },
  lyePurity: {
    naoh: 97,
    koh: 90,
  },
  outputUnits: 'ounces', // 'ounces' or 'grams'
  inputMode: 'weight', // 'weight' or 'percent'
  displayUnits: {
    input: 'oz',
    output: 'oz'
  },
  superfatPercent: 0,
  waterPercent: 33,
  totalWeight: 100
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

const abbreviations = {
  ounces: 'oz',
  grams: 'g'
}

const displayUnits = (recipe) => {
  const { inputMode, outputUnits } = recipe.setup;
  if (inputMode === 'percent') {
    return {
      input: '%', 
      output: abbreviations[outputUnits]
    };
  } else {
    return {
      input: abbreviations[outputUnits],
      output: abbreviations[outputUnits]
    };
  }
}

export const recipesReducer = (state = initialState, action) => {
  const recipe = action.id ? {...state[action.id]} : {};

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
      recipe.setup[action.modeField] = action.value;
      recipe.setup.displayUnits = displayUnits(recipe);

      if (action.modeField === 'inputMode') {
        if (action.value === 'percent') {
          const totalWeight = sumBy(recipe.ingredients, 'amount');
          recipe.setup.totalWeight = totalWeight;

          recipe.ingredients = recipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: (ingredient.amount / totalWeight) * 100
          }));
        } else if (action.value === 'weight') {
          recipe.ingredients = recipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: (ingredient.amount / 100) * recipe.setup.totalWeight
          }));
        }
      } else if (action.modeField === 'outputUnits') {
        recipe.setup.totalWeight = convertTo[action.value](recipe.setup.totalWeight);

        if (recipe.setup.inputMode === 'weight') {
          recipe.ingredients = recipe.ingredients.map((ingredient) => ({
            ...ingredient,
            amount: convertTo[action.value](ingredient.amount)
          }));
        }
      }

      recipe.ingredients = recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        amount: round(ingredient.amount, 2)
      }));

      return {
        ...state,
        [action.id]: recipe
      };

    case 'recipes.addIngredient':
      recipe.ingredients.push({name: '', amount: 0.0});

      return {
        ...state,
        [action.id]: recipe
      };

    case 'recipes.updateIngredient':
      recipe.ingredients[action.index] = action.updatedIngredient;

      return {
        ...state,
        [action.id]: recipe
      };

    default:
      return state;
  }
}
