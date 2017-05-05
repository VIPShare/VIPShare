import React from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import EmptyView from '../EmptyView';

export default ({ loading, loadSuccess, data, dataSource, loadingTip, loadFailTip, emptyTip, renderRow, containerStyle = {} }) => {
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
    );
  }
  if (data.length === 0) {
    return (
      <EmptyView
        tip={emptyTip.tip}
        subTip={emptyTip.subTip}
      />
    );
  }
  return (
    <ListView
      style={containerStyle}
      renderRow={renderRow}
      dataSource={dataSource}
    />
  );
};
