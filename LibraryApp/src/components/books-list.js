import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedBook} from 'store/actions/library';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {libraryForm, showBookDetails} from 'constants/navigators';
import {FilterListBySearch} from 'helpers/library';
import List from 'components/shared/list';
import {search} from 'constants/icons';

const isIOSPlatform = Platform.OS == 'ios';
const loaderTimeout = 2000;

const {
  flex1,
  rowFlex,
  borderRadius20,
  horizontalCenter,
  verticalCenter,
} = Global;
const {comicFont, gochiFont, iconFont, fs18, fs20, fs25, bold} = Typography;
const {p10, py20, px10, px15, px25, p15, mtAuto, mb15} = Spacing;
const {blue, darkGrey, purple, lightGreen, maroon, white} = Colors;

const getItemKey = (item) => `book-${item.id}`;

const BooksList = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, loaderTimeout);
  };

  selectBook = (book) => {
    const {setSelectedBook, navigation} = props;
    setSelectedBook(book);
    navigation.navigate(showBookDetails, {
      book,
    });
  };

  searchText = (value) => {
    setSearchedText(value);
  };

  addNewBook = () => {
    const {setSelectedBook} = props;
    setSelectedBook();
    navigateToForm();
  };

  navigateToForm = () => {
    const {navigation} = props;
    navigation.navigate(libraryForm);
  };

  renderItem = ({item}) => {
    const {name, author, publisher, price} = item;
    const {listItemContainer, listItemName, bookPrice} = styles;
    return (
      <Pressable style={listItemContainer} onPress={() => selectBook(item)}>
        <View style={[flex1, px15]}>
          <Text style={listItemName}>{name}</Text>
          <Text style={[gochiFont, fs20]}>{author}</Text>
          <Text style={[gochiFont, fs18]}>{publisher}</Text>
        </View>
        <View>
          <Text style={bookPrice}>{price}</Text>
        </View>
      </Pressable>
    );
  };

  const {books} = props;
  const {searchContainer, searchIcon, listContainer, button} = styles;
  const booksArr = Object.values(books);
  const filteredList = FilterListBySearch(searchedText, booksArr);
  const containsBooks = filteredList.length > 0;
  return (
    <>
      <View style={p15}>
        <View style={searchContainer}>
          <View style={verticalCenter}>
            <Text style={searchIcon}>{search}</Text>
          </View>
          <TextInput
            value={searchedText}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={searchText}
            placeholder="Search by Book Name / Author Name"
            returnKeyType="search"
          />
        </View>
      </View>
      <SafeAreaView style={listContainer}>
        <View style={p15}>
          {containsBooks ? (
            <List
              data={filteredList}
              itemKey={getItemKey}
              onRefresh={onRefresh}
              renderItem={renderItem}
              loadOnScroll
              batchCount={10}
              refreshing={isRefreshing}
            />
          ) : (
            <View style={horizontalCenter}>
              <Text>No Books Found</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
      <View style={mtAuto}>
        <Pressable style={button} onPress={addNewBook}>
          <Text style={[fs20, bold]}>ADD NEW BOOK</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    ...horizontalCenter,
  },
  title: {
    ...fs25,
    color: blue,
    ...bold,
  },
  searchContainer: {
    ...rowFlex,
    ...borderRadius20,
    backgroundColor: white,
    paddingVertical: isIOSPlatform ? 10 : 0,
    paddingHorizontal: 10,
  },
  searchIcon: {
    ...iconFont,
    color: darkGrey,
    ...px10,
  },
  listContainer: {
    ...flex1,
  },
  listItemContainer: {
    ...mb15,
    backgroundColor: white,
    ...rowFlex,
    ...p10,
  },
  listItemName: {
    ...comicFont,
    ...fs18,
    color: purple,
  },
  bookPrice: {
    ...gochiFont,
    ...fs20,
    ...px25,
    color: maroon,
  },
  button: {
    ...horizontalCenter,
    backgroundColor: lightGreen,
    ...py20,
  },
});

function mapStateToProps({library: {books}}) {
  return {
    books,
  };
}

const mapDispatchToProps = {
  setSelectedBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
