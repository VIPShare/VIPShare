import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import '../ReactotronConfig';  // dev listener

var listIcon, messageIcon;
var selectedListIcon, selectedMessageIcon;
// screen related book keeping
import { registerScreens } from './screens';
registerScreens();

export default class App {
  constructor(props) {
    this._populateIcons().then(() => {
      // Start app only if all icons are loaded
      this.startApp();
    }).catch((error) => {
      console.error(error);
    });
  }

  _populateIcons() {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
          Icon.getImageSource('ios-keypad-outline', 30),
          Icon.getImageSource('ios-chatboxes-outline', 30),
          Icon.getImageSource('ios-keypad', 30),
          Icon.getImageSource('ios-chatboxes', 30),
        ]
      ).then((values) => {
        listIcon = values[0];
        messageIcon = values[1];
        selectedListIcon = values[2];
        selectedMessageIcon = values[3];
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  }

  startApp() {
    // this will start our app
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Shares',
          screen: 'app.shareList',
          icon: listIcon,
          selectedIcon: selectedListIcon,
          title: 'Shares',
        },
        {
          label: 'Message',
          screen: 'app.message',
          icon: messageIcon,
          selectedIcon: selectedMessageIcon,
          title: 'Message',
        }
      ],
      tabsStyle: {
        tabBarButtonColor: '#ffff00',
        tabBarSelectedButtonColor: '#ff9900',
        tabBarBackgroundColor: '#551A8B',
      },
      drawer: {
        left: {
          screen: 'app.SideMenu'
        }
      },
      portraitOnlyMode: true
    });
  }
}
