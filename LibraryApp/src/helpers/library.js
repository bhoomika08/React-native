import {isSearchMatching} from 'helpers/application';

export const FilterListBySearch = (searchedText, allOptions) => {
  let filteredList = [];
  if (searchedText.length > 2) {
    for (const option of allOptions) {
      if (
        isSearchMatching(option.name, searchedText) ||
        isSearchMatching(option.authorName, searchedText)
      ) {
        filteredList.push(option);
      }
    }
  } else {
    filteredList = allOptions;
  }
  return filteredList;
};
