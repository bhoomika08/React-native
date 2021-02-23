import React from 'react';
import {FlatList} from 'react-native';

export const List = ({data = [], renderItem, itemKey}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={data}
    renderItem={renderItem}
    keyExtractor={itemKey}
  />
);
