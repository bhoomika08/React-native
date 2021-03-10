import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {setActiveTab, setSelectedBook} from 'store/actions/library';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {libraryForm} from 'constants/app-defaults';
import {FilterListBySearch} from 'helpers/library';
import List from 'components/shared/list';
import {Icons} from 'constants/icons';

const loaderTimeout = 2000;
const {search} = Icons;

const {
  flex1,
  rowFlex,
  borderRadius20,
  horizontalCenter,
  verticalCenter,
} = Global;
const {comicFont, gochiFont, iconFont, fs18, fs20, fs25, bold} = Typography;
const {p10, py20, px10, px15, px25, p15, mtAuto, mb15} = Spacing;
const {blue, grey, darkGrey, purple, lightGreen, maroon, white} = Colors;

class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetching: false,
      isRefreshing: false,
      searchText: '',
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.getApiData = this.getApiData.bind(this);
    this.selectBook = this.selectBook.bind(this);
    this.search = this.search.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
  }

  componentDidMount() {
    const {books} = this.props;
    if (books.length == 0) {
      this.setState({
        isDataFetching: true,
      });
    }
    setTimeout(() => {
      this.setState({isDataFetching: false});
    }, loaderTimeout);
  }

  onRefresh() {
    this.setState({isRefreshing: true}, () => {
      this.getApiData();
    });
  }

  getApiData() {
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, loaderTimeout);
  }

  selectBook(book) {
    const {setSelectedBook} = this.props;
    setSelectedBook(book);
    this.navigateToForm();
  }

  renderItem = ({item}) => {
    const {name, author, publisher, price} = item;
    const {listItemContainer, listItem, bookPrice} = styles;
    return (
      <Pressable
        style={listItemContainer}
        onPress={() => this.selectBook(item)}>
        <View style={[flex1, px15]}>
          <Text style={listItem}>{name}</Text>
          <Text style={[gochiFont, fs20]}>{author}</Text>
          <Text style={[gochiFont, fs18]}>{publisher}</Text>
        </View>
        <View>
          <Text style={bookPrice}>{price}</Text>
        </View>
      </Pressable>
    );
  };

  getItemKey = (item) => item.id;

  search(value) {
    this.setState({
      searchText: value.trim(),
    });
  }

  addNewBook() {
    const {setSelectedBook} = this.props;
    setSelectedBook();
    this.navigateToForm();
  }

  navigateToForm() {
    const {setActiveTab} = this.props;
    setActiveTab(libraryForm);
  }

  render() {
    const {books} = this.props;
    const {isDataFetching, isRefreshing, searchText} = this.state;
    const {
      titleContainer,
      title,
      searchContainer,
      searchIcon,
      listContainer,
      button,
    } = styles;
    const booksArr = Object.values(books);
    const filteredList = FilterListBySearch(searchText, booksArr);
    const containsBooks = filteredList.length > 0;
    return (
      <>
        <View style={titleContainer}>
          <Text style={title}>List of the Books</Text>
        </View>
        <View style={p15}>
          <View style={searchContainer}>
            <View style={[verticalCenter]}>
              <Text style={searchIcon}>{search}</Text>
            </View>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.search}
              placeholder="Search"
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
                  itemKey={this.getItemKey}
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
    ...p10,
  },
  searchIcon: {
    ...bold,
    ...iconFont,
    ...px10,
    color: darkGrey,
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
  listItem: {
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
  setActiveTab,
  setSelectedBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
