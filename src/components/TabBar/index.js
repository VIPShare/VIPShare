import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements';

import styles from './index.style';

class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: props.defaultSelected,
    };

    this.onChangeTab = this.onChangeTab.bind(this);

    this.renderIcon = this.renderIcon.bind(this);
    this.renderSelectedIcon = this.renderSelectedIcon.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  onChangeTab(selectedTab) {
    this.setState({
      selectedTab,
    });
  }

  renderIcon(tab) {
    if ('string' === typeof tab.icon) {
      return <Icon containerStyle={ styles.tabs.icon.container } color={ styles.tabs.icon.color } name={ tab.icon } size={ styles.tabs.icon.size } />;
    }
    return tab.icon;
  }

  renderSelectedIcon(tab) {
    if ('string' === typeof tab.selectedIcon) {
      return <Icon color={'#6296f9'} name={ tab.selectedIcon } size={30} />;
    }
    return tab.selectedIcon;
  }

  renderTabs() {
    const tabs = this.props.tabs;
    return tabs.map( (tab, index) => {
      return (
        <Tab
          key={ `tabs_${index}` }
          titleStyle={ tab.titleStyle ? tab.titleStyle : styles.tabs.title }
          selectedTitleStyle={ tab.selectedTitleStyle ? tab.selectedTitleStyle : styles.tabs.selected }
          selected={ this.state.selectedTab === tab.title }
          title={ tab.title }
          renderIcon={() => this.renderIcon(tab)}
          renderSelectedIcon={() => this.renderSelectedIcon(tab)}
          onPress={ () => this.onChangeTab(tab.title) }>
          { tab.content }
        </Tab>
      )
    } )
  }

  render() {
    return (
      <Tabs>
        { this.renderTabs() }
      </Tabs>
    );
  }
}

TabBar.propTypes = {
  defaultSelected: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    selectedTitleStyle: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    selectedIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    content: PropTypes.node.isRequired,
  }).isRequired).isRequired,
}

TabBar.defaultProps = {
  defaultSelected: 'Shares',
}

export default TabBar;
