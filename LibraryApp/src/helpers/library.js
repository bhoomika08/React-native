import {isSearchMatching} from 'helpers/application';

export const FilterListBySearch = (searchedText, allOptions) => {
  let filteredList = [];
  if (searchedText.length > 2) {
    for (const option of allOptions) {
      if (
        isSearchMatching(option.name, searchedText) ||
        isSearchMatching(option.author, searchedText)
      ) {
        filteredList.push(option);
      }
    }
  } else {
    filteredList = allOptions;
  }
  return filteredList;
};

export const GetBookDetails = (data) => {
  const booksListItem = {};
  const {
    id,
    selectedPublisherValue,
    bookName,
    authorName,
    price,
    email,
    url,
  } = data;
  booksListItem[id] = {
    id,
    name: bookName,
    author: authorName,
    publisher: selectedPublisherValue,
    price,
  };
  const bookAllDetails = {
    id,
    publisher: selectedPublisherValue,
    bookName,
    authorName,
    price,
    email,
    url,
  };
  return {booksListItem, bookAllDetails};
};
