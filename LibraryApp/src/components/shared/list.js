import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Colors} from 'stylesheets';

const loadMoreTimeout = 2000;
const scrollThreshold = 0.5;
const {darkGrey} = Colors;

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      endIndex: props.batchCount,
      isLoading: false,
    };
    this.listRef = React.createRef();
    this.getFirstBatchOfItems = this.getFirstBatchOfItems.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
  }

  componentDidUpdate({data: prevData}) {
    const {data} = this.props;
    if (prevData != data) {
      this.listRef.current.scrollToOffset({animated: true, offset: 0});
      this.getFirstBatchOfItems();
    }
  }

  getFirstBatchOfItems() {
    const {batchCount} = this.props;
    this.setState({
      endIndex: batchCount,
    });
  }

  loadMoreItems() {
    const {data, batchCount} = this.props;
    const {endIndex} = this.state;
    clearTimeout(this.timeoutId);
    const hasMore = data.length > endIndex;
    if (hasMore) {
      this.setState({isLoading: true}, () => {
        this.timeoutId = setTimeout(() => {
          this.setState({
            endIndex: endIndex + batchCount,
            isLoading: false,
          });
        }, loadMoreTimeout);
      });
    }
  }

  renderFooter() {
    const {isLoading} = this.state;
    return isLoading ? <ActivityIndicator color={darkGrey} /> : null;
  }

  render() {
    const {data, renderItem, itemKey, onRefresh, refreshing} = this.props;
    const {endIndex} = this.state;
    const items = data.slice(0, endIndex);
    return (
      <FlatList
        ref={this.listRef}
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        keyExtractor={itemKey}
        onEndReached={this.loadMoreItems}
        onEndReachedThreshold={scrollThreshold}
        ListFooterComponent={() => this.renderFooter()}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

export default List;
