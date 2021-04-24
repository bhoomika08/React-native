import {isSearchMatching} from 'helpers/application';

export const FilterListBySearch = (searchedText, allOptions) => {
  let filteredList = [];
  if (searchedText.trim().length > 2) {
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
  const {id, selectedPublisherValue, bookName, authorName, price, image} = data;
  booksListItem[id] = {
    id,
    name: bookName,
    author: authorName,
    publisher: selectedPublisherValue,
    price,
    image,
  };
  return booksListItem;
};
