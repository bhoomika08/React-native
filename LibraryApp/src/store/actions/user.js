import {setUserName} from 'constants/action-types';

const UserActions = {
  setName: (payload) => (dispatch) => {
    dispatch({
      type: setUserName,
      payload,
    });
  },
};

export const {setName} = UserActions;
