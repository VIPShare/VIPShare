import React from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

import EmptyView from '../EmptyView';
import Lists from '../Lists';

const swipeoutBtns = [
  {
    text: 'Button'
  }
];
const renderRow = (rowData, sectionID) => {
  return (
    <Swipeout right={swipeoutBtns} backgroundColor="transparent">
      <ListItem
        key={sectionID}
        title={rowData.type}
        subtitle={rowData.account}
        // avatar={{ uri: rowData.avatar_url }}
        rightIcon={{ name: 'chevron-right' }}
      />
    </Swipeout>
  )
}

export default ({ loading, loadSuccess, accounts, dataSource, loadingTip, loadFailTip, emptyTip }) => (
  <Lists
    loading={loading}
    loadSuccess={loadSuccess}
    data={accounts}
    dataSource={dataSource}
    loadingTip={loadingTip}
    loadFailTip={loadFailTip}
    emptyTip={emptyTip}
    renderRow={renderRow}
  />
);
