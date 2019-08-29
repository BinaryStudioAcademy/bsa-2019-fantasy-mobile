import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import Registration from '../../components/Registration';
import Login from '../../components/Login';
import Home from '../../components/Home';
import Profile from '../../components/Profile';

import Sidebar from '../../components/Sidebar';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      title: 'Sign In',
      headerStyle,
    },
  },
  SignUp: {
    screen: Registration,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle,
    },
  },
});

export const SignedIn = createDrawerNavigator(
  {
    Home: Home,
    Profile: Profile,
  },
  {
    contentComponent: Sidebar,
  },
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
};
