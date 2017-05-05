import React from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import EmptyView from '../EmptyView';
import Lists from '../Lists';

const renderRow = (rowData, sectionID) => {
  return (
    <ListItem
      roundAvatar
      key={sectionID}
      title={rowData.name}
      subtitle={rowData.subtitle}
      avatar={{ uri: rowData.avatar_url }}
      rightIcon={{ name: 'chevron-right' }}
    />
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
