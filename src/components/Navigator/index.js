import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';

import { Icon, Row, Gird, Col } from 'react-native-elements';

import styles from './index.style';

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  renderLeftButton(navigator, leftButton, props) {
    if (leftButton) {
      return leftButton(navigator, props);
    }
    return <Icon name="keyboard-arrow-left" onPress={ () => navigator.pop() } />;
  }

  renderRightButton(navigator, rightButton, props) {
    if (rightButton) {
      return rightButton(navigator, props);
    }
    return null;
  }

  renderTitle(title, props) {
    if (title) {
      return 'function' === typeof title ? title(title, props) : <Text style={ styles.title.font }>{ title }</Text>;
    }
    return null;
  }

  render() {
    const { navigator, route, leftButton, rightButton, title, style } = this.props;
    return (
      <Row style={ styles.container }>
        <Col size={ 10 } style={ styles.left } >{ this.renderLeftButton(navigator, leftButton, this.props) }</Col>
        <Col size={ 80 } style={ styles.title.container } >{ this.renderTitle(title, this.props) }</Col>
        <Col size={ 10 } style={ styles.right } >{ this.renderRightButton(navigator, rightButton, this.props) }</Col>
      </Row>
    );
  }
}

Navigator.propTypes = {
  leftButton: PropTypes.func.isRequired,
  rightButton: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.func,
  ]).isRequired,
  style: PropTypes.object,
}

Navigator.defaultProps = {
  leftButton: () => {},
  rightButton: () => {},
  title: 'Navigator',
}

export {
  Navigator as default,
};
