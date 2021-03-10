import {library} from 'constants/action-types';

const {
  setActiveTab: setActiveLibTab,
  setSelectedBook: setBookDetails,
  updateBooksList,
} = library;

const LibraryActions = {
  setActiveTab: (payload) => (dispatch) =>
    dispatch({
      type: setActiveLibTab,
      payload,
    }),

  setSelectedBook: (payload = {}) => (dispatch) =>
    dispatch({
      type: setBookDetails,
      payload,
    }),

  updateBooks: (payload) => (dispatch) =>
    dispatch({
      type: updateBooksList,
      payload,
    }),
};

export const {setActiveTab, setSelectedBook, updateBooks} = LibraryActions;
