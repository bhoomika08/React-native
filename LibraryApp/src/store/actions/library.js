import {library} from 'constants/action-types';
import {getBooks} from 'constants/api';
import {alert} from 'helpers/application';

const {setBooksList} = library;

const LibraryActions = {
  setBooks: (payload) => (dispatch) => {
    dispatch({
      type: setBooksList,
      payload,
    });
  },

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

export const {setBooks, fetchBooksList} = LibraryActions;
