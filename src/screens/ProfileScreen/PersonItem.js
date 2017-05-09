import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import styles from './PersonItem.style';

const PersonItem = ({ icon, title }) => {
  return (
    <Card containerStyle={styles.container}>
      <Icon
        name={icon.name}
        color={icon.color}
        type={icon.type || 'material'}
        size={50}
        containerStyle={styles.icon.container}
      />
      <Text>{title}</Text>
    </Card>
  )
}

PersonItem.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default PersonItem;
