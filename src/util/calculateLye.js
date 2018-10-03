import { find, sum } from 'lodash';

import oilProperties from './oilProperties';

export const defaultSetup = {
  lyeRatio: {
    naoh: 1.0,
    koh: 0.0
  },
  lyePurity: {
    naoh: 0.97,
    koh: 0.90,
  },
  superfatPercent: 0.0,
  waterPercent: 0.33
};

const calculateSingleLye = (ingredients, lyeType, setup) => {
  const lyeAmounts = ingredients.map((ingredient) => {
    const info = find(oilProperties, ['name', ingredient.name]);
    return ingredient.amount * info.sap[lyeType];
  });

  const totalLye = sum(lyeAmounts);
  const adjustedLye = (totalLye / setup.lyePurity[lyeType]) * (1 - setup.superfatPercent);
  return adjustedLye;
};

const calculateWater = (ingredients, setup) => {
  return setup.waterPercent * sum(ingredients.map(({amount}) => amount));
}

export const calculateLye = (ingredients, setup = defaultSetup) => {
  return {
    naoh: calculateSingleLye(ingredients, 'naoh', setup) * setup.lyeRatio.naoh,
    koh: calculateSingleLye(ingredients, 'koh', setup) * setup.lyeRatio.koh,
    water: calculateWater(ingredients, setup)
  }
}
