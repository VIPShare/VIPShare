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

  renderLeftButton(navigator, leftButton) {
    if (leftButton) {
      return leftButton(navigator);
    }
    return <Icon name="keyboard-arrow-left" onPress={ () => navigator.pop() } />;
  }

  renderRightButton(navigator, rightButton) {
    if (rightButton) {
      return rightButton(navigator);
    }
    return null;
  }

  renderTitle(title) {
    if (title) {
      return 'function' === typeof title ? title() : <Text style={ styles.title.font }>{ title }</Text>;
    }
    return null;
  }

  render() {
    const { navigator, route, leftButton, rightButton, title, style } = this.props;
    return (
      <Row style={ [styles.container, style] }>
        <Col size={ 10 } style={ styles.left } >{ this.renderLeftButton(navigator, leftButton) }</Col>
        <Col size={ 80 } style={ styles.title.container } >{ this.renderTitle(title) }</Col>
        <Col size={ 10 } style={ styles.right } >{ this.renderRightButton(navigator, rightButton) }</Col>
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
}

class DefaultNav extends Navigator {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { navigator } = this.props;
    return (
      <Row style={ styles.container }>
        <Col size={ 10 } style={ styles.left } ></Col>
        <Col size={ 80 } style={ styles.title.container } >{ this.renderTitle(this.props.title) }</Col>
        <Col size={ 10 } style={ styles.right } ></Col>
      </Row>
    );
  }
  
}

DefaultNav.defaultProps = {
  title: 'Navigator',
  ...Navigator.defaultProps
}

export {
  Navigator as default,
  DefaultNav,
};
