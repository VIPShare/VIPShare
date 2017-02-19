import React, { PropTypes, Component } from 'react';
import { List, ListItem, SideMenu } from 'react-native-elements';

const DrawerScreen = () => {
  return (
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
  )
}

const create = () => (WrappedCompnent) => {
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
          <WrappedCompnent toggleSideMenu={ this.toggleSideMenu } />
        </SideMenu>
      );
    }
  }

  SideMenuDecorator.LeftButton = WrappedCompnent.LeftButton;
  SideMenuDecorator.RightButton = WrappedCompnent.RightButton;
  SideMenuDecorator.Title = WrappedCompnent.Title;

  return SideMenuDecorator;
}

export {
  create,
}
