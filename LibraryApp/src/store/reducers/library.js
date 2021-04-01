import {booksList} from 'constants/app-defaults';
import {library as LibraryActionType} from 'constants/action-types';
import {books} from 'constants/data';

const {
  setBooksList,
  setActiveTab,
  setSelectedBook,
  updateBooksList,
} = LibraryActionType;

const INITIAL_STATE = {
  activeTab: booksList,
  books,
  selectedBook: null,
};

const library = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case setBooksList:
      return {
        ...state,
        books: payload,
      };
    case setActiveTab:
      return {
        ...state,
        activeTab: payload,
      };
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
    default:
      return state;
  }
};

export default library;
