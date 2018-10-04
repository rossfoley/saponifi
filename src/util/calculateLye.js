import { find, sum } from 'lodash';

import oilProperties from './oilProperties';

export const defaultSetup = {
  lyeRatio: {
    naoh: 100,
    koh: 0
  },
  lyePurity: {
    naoh: 97,
    koh: 90,
  },
  superfatPercent: 0,
  waterPercent: 33
};

const calculateSingleLye = (ingredients, lyeType, setup) => {
  const lyeAmounts = ingredients.map((ingredient) => {
    const info = find(oilProperties, ['name', ingredient.name]);
    if (info) {
      return ingredient.amount * info.sap[lyeType];
    } else {
      console.log(`Can't find ingredient: ${ingredient.name}`);
      return 0;
    }
  });

  const totalLye = sum(lyeAmounts);
  const adjustedLye = (totalLye / (setup.lyePurity[lyeType] / 100)) * (1 - (setup.superfatPercent / 100));
  return adjustedLye;
};

const calculateWater = (ingredients, setup) => {
  return (setup.waterPercent / 100) * sum(ingredients.map(({amount}) => amount));
}

export const calculateLye = (ingredients, setup = defaultSetup) => {
  return {
    naoh: calculateSingleLye(ingredients, 'naoh', setup) * (setup.lyeRatio.naoh / 100),
    koh: calculateSingleLye(ingredients, 'koh', setup) * (setup.lyeRatio.koh / 100),
    water: calculateWater(ingredients, setup)
  }
}
