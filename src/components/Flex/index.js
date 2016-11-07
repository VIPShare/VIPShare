import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

const Flex = ({ row, column, justifyContent, alignItems, children }) => {
  const flexDirection = column ? 'column': 'row';  // default is row.
  return (
    <View style={{ flex: 1, flexDirection, justifyContent, alignItems }} >
      { children }
    </View>
  )
}

Flex.propTypes = {
  row: PropTypes.bool.isRequired,
  column: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

Flex.defaultProps = {
  row: false,
  column: false,
}

export default Flex;
