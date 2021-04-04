import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedBook} from 'store/actions/library';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {libraryForm, showBookDetails} from 'constants/app-defaults';
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
const message = 'tap back again to exit the App';

class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetching: false,
      isRefreshing: false,
      searchText: '',
      exitApp: 0,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.setExitApp = this.setExitApp.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.selectBook = this.selectBook.bind(this);
    this.search = this.search.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
  }

  componentDidMount() {
    !isIOSPlatform &&
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
  }

  componentWillUnmount() {
    !isIOSPlatform &&
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
  }

  handleBackButtonClick() {
    const {exitApp} = this.state;
    setTimeout(() => {
      this.setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      this.setExitApp(exitApp + 1);
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  }

  setExitApp(val) {
    this.setState({
      exitApp: val,
    });
  }

  onRefresh() {
    this.setState({isRefreshing: true}, () => {
      setTimeout(() => {
        this.setState({isRefreshing: false});
      }, loaderTimeout);
    });
  }

  selectBook(book) {
    const {setSelectedBook, navigation} = this.props;
    setSelectedBook(book);
    navigation.navigate(showBookDetails, {
      params: {
        book,
      },
    });
  }

  search(value) {
    this.setState({
      searchText: value,
    });
  }

  addNewBook() {
    const {setSelectedBook} = this.props;
    setSelectedBook();
    this.navigateToForm();
  }

  navigateToForm() {
    const {navigation} = this.props;
    navigation.navigate(libraryForm);
  }

  renderItem = ({item}) => {
    const {name, author, publisher, price} = item;
    const {listItemContainer, listItemName, bookPrice} = styles;
    return (
      <Pressable
        style={listItemContainer}
        onPress={() => this.selectBook(item)}>
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

  render() {
    const {books} = this.props;
    const {isDataFetching, isRefreshing, searchText} = this.state;
    const {searchContainer, searchIcon, listContainer, button} = styles;
    const booksArr = Object.values(books);
    const filteredList = FilterListBySearch(searchText, booksArr);
    const containsBooks = filteredList.length > 0;
    return (
      <>
        <View style={p15}>
          <View style={searchContainer}>
            <View style={verticalCenter}>
              <Text style={searchIcon}>{search}</Text>
            </View>
            <TextInput
              value={searchText}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.search}
              placeholder="Search by Book Name / Author Name"
              returnKeyType="search"
            />
          </View>
        </View>
        <SafeAreaView style={listContainer}>
          {isDataFetching ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={p15}>
              {containsBooks ? (
                <List
                  data={filteredList}
                  itemKey={getItemKey}
                  onRefresh={this.onRefresh}
                  renderItem={this.renderItem}
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
          )}
        </SafeAreaView>
        <View style={mtAuto}>
          <Pressable style={button} onPress={this.addNewBook}>
            <Text style={[fs20, bold]}>ADD NEW BOOK</Text>
          </Pressable>
        </View>
      </>
    );
  }
}

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
