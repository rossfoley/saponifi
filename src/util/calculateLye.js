import { find, sum } from 'lodash';

import oilProperties from './oilProperties';

const defaultSetup = {
  purity: {
    naoh: 0.97,
    koh: 0.90,
  },
  superfatPercent: 0.0,
  waterPercent: 0.33
};

const calculateSingleLye = (ingredients, lyeType, setup) => {
  const lyeAmounts = ingredients.map((ingredient) => {
    const info = find(oilInfo, ['name', ingredient.name]);
    return ingredient.amount * info.sap[lyeType];
  });
  
  const totalLye = sum(lyeAmounts);
  const adjustedLye = (totalLye / setup.purity[lyeType]) * (1 - setup.superfatPercent);
  return adjustedLye;
};

const calculateWater = (ingredients, setup) => {
  return setup.waterPercent * sum(ingredients.map(({amount}) => amount));
}

const calculateLye = (ingredients, percents, setup = defaultSetup) => {
  return {
    naoh: calculateSingleLye(ingredients, 'naoh', setup) * percents.naoh,
    koh: calculateSingleLye(ingredients, 'koh', setup) * percents.koh,
    water: calculateWater(ingredients, setup)
  }
}
