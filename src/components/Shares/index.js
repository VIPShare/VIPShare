import React from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import EmptyView from '../EmptyView';

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

export default ({ loading, loadSuccess, accounts, dataSource, loadingTip, loadFailTip, emptyTip }) => {
  if (loading) {
    return (
      <EmptyView
        tip={loadingTip.tip}
        subTip={loadingTip.subTip}
      />
    );
  }
  if (!loadSuccess) {
    return (
      <EmptyView
        tip={loadFailTip.tip}
        subTip={loadFailTip.subTip}
      />
    )
  }
  if (accounts.length === 0) {
    return (
      <EmptyView
        tip={emptyTip.tip}
        subTip={emptyTip.subTip}
      />
    )
  }
  return (
    <ListView
      renderRow={renderRow}
      dataSource={dataSource}
    />
  );
}
