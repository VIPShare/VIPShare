import React, { PropTypes, Component } from 'react';
import { Text, View } from 'react-native';
import { List, ListItem, SideMenu } from 'react-native-elements';

const DrawerScreen = (
  <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
    <List containerStyle={{marginBottom: 20}}>
      <ListItem
        key={ 1 }
        title="Angular"
        leftIcon={ {name: 'ios-chatboxes-outline', type: 'ionicon'} }
      />
      <ListItem
        key={ 2 }
        title="Angular"
        leftIcon={ {name: 'ios-chatboxes-outline', type: 'ionicon'} }
      />
    </List>
  </View>
)

const create = (otherProps) => (WrappedCompnent) => {
  class SideMenuDecorator extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showUser: false,
      }

      this.toggleSideMenu = this.toggleSideMenu.bind(this);
    }

    toggleSideMenu() {
      this.setState({
        showUser: !this.state.showUser,
      });
    }

    render() {
      return (
        <SideMenu
          isOpen={ this.state.showUser }
          menu={ DrawerScreen }>
          <View style={ {flex: 1, backgroundColor: 'white',} }>
            <WrappedCompnent {...this.props} toggleSideMenu={ this.toggleSideMenu } />
          </View>
        </SideMenu>
      );
    }
  }

  SideMenuDecorator.LeftButton = WrappedCompnent.LeftButton;
  SideMenuDecorator.RightButton = WrappedCompnent.RightButton;

  return SideMenuDecorator;
}

export {
  create,
}
