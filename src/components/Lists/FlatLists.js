import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';

import EmptyView from '../EmptyView';

const FlatLists = (props) => {
  const { loadSuccess, data, loadingTip, loadFailTip, emptyTip, containerStyle = {}, ...other } = props;
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
    <FlatList
      {...props}
      style={containerStyle}
      data={data}
    />
  )
}

export default FlatLists;
