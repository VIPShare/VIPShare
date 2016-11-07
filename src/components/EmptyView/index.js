import React, { Component, PropTypes } from 'react';
import { Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Flex from '../Flex';

class EmptyView extends Component {
  constructor(props) {
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
    this.renderSubTip = this.renderSubTip.bind(this);
  }

  renderIcon(icon) {
    if (!icon) {
      return false;
    }
    if (icon.name) {
      // icon from vector icons, now only support ionicons.
      return (
        <Icon
          name={ icon.name }
          size={ icon.size }
          color={ icon.color } 
        />
      )
    }
    if (icon.uri) {
      // icon from web
      return (
        <Image
          source={{ uri: icon.uri }}
        />
      )
    }
    // icon from require
    return (
      <Image
        source={ icon }
      />
    )
  }

  renderSubTip(subTip) {
    if (subTip) {
      return <Text>{ subTip }</Text>
    }
    return false;
  }

  render() {
    const { icon, tip, subTip } = this.props;
    return (
      <Flex column justifyContent="center" alignItems="center">
        { this.renderIcon(icon) }
        <Text>{ tip }</Text>
        { this.renderSubTip(subTip) }
      </Flex>
    )
  }
}

EmptyView.propTypes = {
  tip: PropTypes.string.isRequired,
  subTip: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

EmptyView.defaultProps = {
}

export default EmptyView;
