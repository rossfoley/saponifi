import uniqid from 'uniqid';

const initialState = {
  '4n5pxq24kpiob12og9': {
    id: '4n5pxq24kpiob12og9',
    name: 'Test Recipe',
    unit: 'percent',
    ingredients: [
      {
        name: 'Coconut Oil',
        amount: '100'
      }
    ]
  }
};

const createRecipe = (name = 'Recipe Name') => {
  return {
    type: 'recipes.createRecipe',
    name
  }
};

export const actions = {
  createRecipe
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
          unit: 'percent',
          ingredients: []
        }
      };

    default:
      return state;
  }
}
