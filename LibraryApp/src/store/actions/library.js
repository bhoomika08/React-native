import {library} from 'constants/action-types';

const {
  setSelectedBook: setBookDetails,
  updateBooksList,
  setCurrentLocation: currentLocation,
} = library;

const LibraryActions = {
  setSelectedBook: (payload = null) => (dispatch) =>
    dispatch({
      type: setBookDetails,
      payload,
    }),

  updateBooks: (payload) => (dispatch) =>
    dispatch({
      type: updateBooksList,
      payload,
    }),

  setCurrentLocation: (lat, long) => (dispatch) => {
    return dispatch({
      type: currentLocation,
      payload: {lat, long},
    })
  }
};

export const {setSelectedBook, updateBooks, setCurrentLocation} = LibraryActions;
