import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';

import { Icon, Row, Gird } from 'react-native-elements';

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  renderLeftButton(leftButton) {
    if (leftButton) {
      return leftButton;
    }
    if (index === 0) {
      return null;
    }
    return <Icon name="keyboard-arrow-left" onPress={ () => navigator.pop() } />;
  }

  renderRightButton(rightButton) {
    if (rightButton) {
      return rightButton;
    }
    return null;
  }

  renderTitle(title) {
    if (title) {
      return 'function' === typeof title ? title() : <Text>{ title }</Text>;
    }
    return null;
  }

  render() {
    const { leftButton, rightButton, title, style } = this.props;
    return (
      <Row style={ style }>
        <Col size={ 10 }>{ this.renderLeftButton(leftButton) }</Col>
        <Col size={ 80 }>{ this.renderTitle(title) }</Col>
        <Col size={ 10 }>{ this.renderRightButton(rightButton) }</Col>
      </Row>
    );
  }
}

Navigator.propTypes = {
  leftButton: PropTypes.node.isRequired,
  rightButton: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func,
  ]).isRequired,
  style: PropTypes.object,
}

export default Navigator;
