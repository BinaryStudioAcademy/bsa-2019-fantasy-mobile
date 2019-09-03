import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import Login from '../../components/Login';
import Home from '../Home';
import Profile from '../Profile';
import FixturesDetails from '../../components/FixturesDetails';
import Fixtures from '../../containers/FixturesContainers';
import Live from '../../containers/LiveContainer/index';

import Sidebar from '../../components/Sidebar';

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

export const MatchStats = createStackNavigator({
  Fixtures: {
    screen: Fixtures,
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
  FixturesDetails: {
    screen: FixturesDetails,
    navigationOptions: {
      header: null,
    },
  },
});

export const SignedIn = createDrawerNavigator(
  {
    Home,
    Profile,
    Fixtures: MatchStats,
    Live,
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
