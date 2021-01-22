import {increaseCounter} from 'constants/action-types';

const INITIAL_STATE = {
  count: 0,
};

const counter = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case increaseCounter:
      return {
        ...state,
        count: payload,
      };
    default:
      return state;
  }
};

export default counter;
