import React from 'react';
import {
  ListView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

import EmptyView from '../EmptyView';
import Lists from '../Lists';

const swipeoutBtns = [
  {
    text: 'Button'
  }
];
const renderRow = (rowData, sectionID, screenProps) => {
  return (
    <Swipeout right={swipeoutBtns} backgroundColor="transparent" disabled={!rowData.editable}>
      <ListItem
        key={sectionID}
        title={rowData.type}
        subtitle={rowData.username}
        // avatar={{ uri: rowData.avatar_url }}
        rightIcon={{ name: 'chevron-right' }}
        onPress={()=> {
          screenProps.redirect(NavigationActions.navigate({
            routeName: 'ShareAdd',
            params: {
              id: rowData.id,
              readonly: !rowData.editable,
            }
          }));
        }}
      />
    </Swipeout>
  )
}

export default ({ loading, loadSuccess, accounts, dataSource, loadingTip, loadFailTip, emptyTip, screenProps }) => (
  <Lists
    loading={loading}
    loadSuccess={loadSuccess}
    data={accounts}
    dataSource={dataSource}
    loadingTip={loadingTip}
    loadFailTip={loadFailTip}
    emptyTip={emptyTip}
    renderRow={(rowData, sectionID) => renderRow(rowData, sectionID, screenProps)}
  />
);
