import React, { PropTypes, Component } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let userIcon;
const create = () => (WrappedCompnent) => {
  const navigatorButtons = WrappedCompnent.navigatorButtons || [];
  class SideMenuDecorator extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showUser: true,
      }

      this._populateIcons = this._populateIcons.bind(this);
      this._setLeftButtons = this._setLeftButtons.bind(this);
      this._setRightButtons = this._setRightButtons.bind(this);
      this._clearLeftButtons = this._clearLeftButtons.bind(this);
      this.onShowDrawer = this.onShowDrawer.bind(this);
      this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    }

    componentWillMount() {
      this._populateIcons().then(() => {
        this._setLeftButtons(navigatorButtons.leftButtons);
        this._setRightButtons(navigatorButtons.rightButtons);
      }).catch( err => {
        console.error(err);
      } )
      
    }

    _populateIcons() {
      return new Promise(function (resolve, reject) {
        Promise.all(
          [
            Icon.getImageSource('ios-person', 30),
          ]
        ).then((values) => {
          userIcon = values[0];
          resolve(true);
        }).catch((error) => {
          console.log(error);
          reject(error);
        }).done();
      });
    }

    _setLeftButtons(buttons = []) {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            icon: userIcon,
            id: 'user',
            testID: 'user_e2e_rules'
          },
          ...buttons,
        ]
      })
    }

    _setRightButtons(buttons = []) {
      this.props.navigator.setButtons({
        rightButtons: buttons,
      })
    }

    _clearLeftButtons() {
      this.props.navigator.setButtons({
        leftButtons: [],
      })
    }

    onNavigatorEvent(event) {
      if (event.type == 'NavBarButtonPress') {
        if (event.id == 'user') {
          this.onShowDrawer();
        }
      }
    }

    onShowDrawer() {
      // this._clearLeftButtons();   can't get the event of the dimissing of sidemenu.
      this.props.navigator.toggleDrawer({
        to: 'open',
        side: 'left',
        animated: true
      });
    }

    render() {
      return (
        <WrappedCompnent
          {...this.props}
          onNavigatorEvent={ this.onNavigatorEvent }
        />
      );
    }
  }

  return SideMenuDecorator;
}

export {
  create,
}
