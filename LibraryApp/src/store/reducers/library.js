import {library as LibraryActionType} from 'constants/action-types';
import {books} from 'constants/data';

const {
  setSelectedBook,
  updateBooksList,
  setCurrentLocation,
} = LibraryActionType;

const INITIAL_STATE = {
  books,
  selectedBook: null,
  currentLocation: {
    lat: '',
    long: '',
  },
};

const library = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case setSelectedBook:
      return {
        ...state,
        selectedBook: payload,
      };
    case updateBooksList:
      return {
        ...state,
        books: {...state.books, ...payload},
      };
    case setCurrentLocation:
      return {
        ...state,
        currentLocation: {
          lat: payload.lat,
          long: payload.long,
        },
      };
    default:
      return state;
  }
};

export default library;
