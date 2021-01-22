import {increaseCounter} from 'constants/action-types';

const CounterActions = {
  increaseCount: () => (dispatch, getState) => {
    const {count} = getState().counter;
    dispatch({
      type: increaseCounter,
      payload: count + 1,
    });
  },
};

export const {increaseCount} = CounterActions;
