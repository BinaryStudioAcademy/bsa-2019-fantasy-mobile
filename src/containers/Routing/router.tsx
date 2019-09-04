import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Login from '../../components/Login';
import Home from '../Home';
import Profile from '../Profile';
import FixturesDetails from '../../components/FixturesDetails';
import Fixtures from '../../containers/FixturesContainers';
import Live from '../../containers/LiveContainer/index';

import Sidebar from '../../components/Sidebar';

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
        screen: Login,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
};
