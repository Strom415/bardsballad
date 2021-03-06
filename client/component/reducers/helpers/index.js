import { fromJS } from 'immutable';
import character from '../../../../practiceData/genCharacter';
import rolls from '../../../../practiceData/genRolls';

const setAbilityStat = (state, stat) => {
  let updatedState = state;
  const updated = state.getIn(['data', 'holder', stat, 'selected']);
  const val = state.getIn(['data', 'currentValue']);
  const position = state.getIn(['data', 'currentIndex']);

  if (val && !updated) {
    updatedState = state
      .updateIn(['data', 'currentValue'], () => null)
      .updateIn(['data', 'currentIndex'], () => null)
      .updateIn(['data', 'rolls', position], () => 'DONE')
      .updateIn(['data', 'holder', stat, 'val'], () => val)
      .updateIn(['data', 'holder', stat, 'selected'], () => true);
  }

  return updatedState;
};

const setFinalAbility = (state) => {
  let updatedState = state;
  const holder = state.getIn(['data', 'holder']).toJS();
  const isReady = Object.keys(holder).every(stat => holder[stat].selected);

  if (isReady) {
    const scores = Object.keys(holder).reduce((acc, stat) => {
      acc[stat] = holder[stat].val;
      return acc;
    }, {});
    const ability = character.genAbility(scores);
    updatedState = updatedState.updateIn(['character', 'ability'], () => fromJS(ability));
  }

  return updatedState;
};

const setRolls = (state, select) => {
  let updatedState = state.updateIn(['data', 'rollSelect'], () => select);

  if (select === 'standard') {
    updatedState = updatedState.updateIn(['data', 'rolls'], () => fromJS(rolls.genStandard()));
  } else if (select === 'roll') {
    updatedState = updatedState.updateIn(['data', 'rolls'], () => fromJS(rolls.genRollList()));
  }

  return updatedState;
};

export default {
  setAbilityStat,
  setFinalAbility,
  setRolls,
};
