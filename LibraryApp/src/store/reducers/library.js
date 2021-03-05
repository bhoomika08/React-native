import {booksList} from 'constants/app-defaults';
import {library as LibraryActionType} from 'constants/action-types';

const {setBooksList, setActiveTab, setSelectedBook} = LibraryActionType;

const INITIAL_STATE = {
  activeTab: booksList,
  books: [],
  selectedBook: {},
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
    default:
      return state;
  }
};

export default library;
