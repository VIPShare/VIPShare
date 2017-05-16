import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';

import Page from '../../components/Page';

import styles from './index.style';

const SettingScreen = (props) => {
  return (
    <Page
      enableLoad={false}
    >
      <List containerStyle={{ marginBottom: 20 }}>
        <ListItem
          key={5}
          title="About VIPSHARE"
          leftIcon={{ name: 'info-outline' }}
        />
      </List>

      <Button title="LOGOUT" backgroundColor="red" icon={{ name: 'power-settings-new' }} onPress={() => {
        Alert.alert('Warning', 'Are you sure to logout VIPSHARE?', [
          { text: 'Cancel', onPress: () => { } },
          {
            text: 'Sure', onPress: async () => {
              try {
                await AsyncStorage.removeItem('access_token');
                await AsyncStorage.removeItem('refresh_token');
                await AsyncStorage.removeItem('user:profile');
              } catch (error) {
                Toast.show('Error while logout');
              }
              const homeAction = NavigationActions.navigate({
                routeName: 'Main',
                action: NavigationActions.navigate({ routeName: 'Recommends' }),
              });
              props.screenProps.redirect(homeAction);
            }
          },
        ])
      }} />
    </Page>
  );
}

SettingScreen.navigationOptions = ({ navigation }) => {
  const { state = {}, setParams, navigate } = navigation;
  return {
    title: 'Setting',
    headerLeft: <Icon name="keyboard-arrow-left" containerStyle={styles.nav.leftWrapper} onPress={() => {
      const homeAction = NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.navigate({ routeName: 'Recommends' }),
      });
      navigation.dispatch(homeAction);
    }} />,
  }
}

export default SettingScreen;
