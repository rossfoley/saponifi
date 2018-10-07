import { find, sum } from 'lodash';

import oilProperties from './oilProperties';

const calculateSingleLye = (ingredients, lyeType, setup) => {
  const normalIngredients = ingredients.filter(({superfat}) => !superfat);
  const lyeAmounts = normalIngredients.map((ingredient) => {
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

export const calculateLye = (ingredients, setup) => {
  const multiplier = setup.inputMode === 'percent' ?
    (setup.totalWeight / 100) :
    1;

  return {
    naoh: calculateSingleLye(ingredients, 'naoh', setup) * (setup.lyeRatio.naoh / 100) * multiplier,
    koh: calculateSingleLye(ingredients, 'koh', setup) * (setup.lyeRatio.koh / 100) * multiplier,
    water: calculateWater(ingredients, setup) * multiplier
  }
}
