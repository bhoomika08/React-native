import {setUserName} from 'constants/action-types';

const INITIAL_STATE = {
  name: '',
};

const user = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case setUserName:
      return {
        ...state,
        name: payload,
      };
    default:
      return state;
  }
};

export default user;
