import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

const loadMoreTimeout = 2000;
const scrollThreshold = 0;

class List extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.getFirstBatchOfItems = this.getFirstBatchOfItems.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    const {data, loadOnScroll} = this.props;
    const {items} = this.state;

    if (loadOnScroll) {
      if (data.length > 0 && items.length == 0) {
        this.getFirstBatchOfItems();
      }
    } else {
      this.setState({
        items: data,
      });
    }
  }

  getFirstBatchOfItems() {
    const {data, batchCount} = this.props;
    this.setState({
      items: data.slice(0, batchCount),
    });
  }

  loadMoreItems() {
    const {data, batchCount, loadOnScroll} = this.props;
    const {items} = this.state;
    if (loadOnScroll) {
      clearTimeout(this.timeoutId);
      const hasMore = data.length - items.length > 0;
      if (hasMore) {
        this.timeoutId = setTimeout(() => {
          this.setState((prevState) => ({
            items: [
              ...items,
              ...data.slice(
                prevState.items.length,
                prevState.items.length + batchCount,
              ),
            ],
          }));
        }, loadMoreTimeout);
      }
    }
  }

  renderFooter() {
    const {data} = this.props;
    const {items} = this.state;
    const hasMoreItems = data.length - items.length > 0;
    return hasMoreItems ? <ActivityIndicator /> : null;
  }

  render() {
    const {renderItem, itemKey, onRefresh, refreshing} = this.props;
    const {items} = this.state;
    return (
      <>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={items}
          renderItem={renderItem}
          keyExtractor={itemKey}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={scrollThreshold}
          ListFooterComponent={this.renderFooter}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </>
    );
  }
}

export default List;
