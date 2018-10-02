const initialState = {
  0: {
    id: 0,
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

const recipesReducer = (state = initialState, action) => {
  return state;
}

export default recipesReducer;
