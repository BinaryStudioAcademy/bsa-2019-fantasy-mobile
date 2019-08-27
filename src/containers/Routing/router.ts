import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Registration from '../../components/Registration';
import Login from '../../components/Login';
import Home from '../../components/Home';
import Profile from '../../components/Profile';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: Registration,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle,
    },
  },
  SignIn: {
    screen: Login,
    navigationOptions: {
      title: 'Sign In',
      headerStyle,
    },
  },
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    },
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
