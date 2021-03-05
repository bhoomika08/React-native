import {library} from 'constants/action-types';
import {getBooks} from 'constants/api';
import {alert} from 'helpers/application';

const {
  setBooksList,
  setActiveTab: setActiveLibTab,
  setSelectedBook: setBookDetails,
} = library;

const LibraryActions = {
  setBooks: (payload) => (dispatch) => {
    dispatch({
      type: setBooksList,
      payload,
    });
  },

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

  fetchBooksList: () => (dispatch) =>
    fetch(getBooks, {
      method: 'GET',
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        dispatch(setBooks(response.books));
      })
      .catch((error) => alert('Error', error.message)),
};

export const {
  setBooks,
  setActiveTab,
  setSelectedBook,
  fetchBooksList,
} = LibraryActions;
