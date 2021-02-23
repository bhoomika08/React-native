import {library as LibraryActionType} from 'constants/action-types';

const {setBooksList} = LibraryActionType;

const INITIAL_STATE = {
  books: [],
};

const library = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case setBooksList:
      return {
        ...state,
        books: payload,
      };
    default:
      return state;
  }
};

export default library;
