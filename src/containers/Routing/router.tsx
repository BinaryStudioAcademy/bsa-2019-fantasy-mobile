import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Login from '../../components/Login';
import HomeContainer from '../../containers/HomeContainer';
import LeagueDetails from '../../containers/LeaguesContainer/components/LeagueDetails';
import Profile from '../Profile';
import FixturesDetails from '../../components/FixturesDetails';
import Spinner from '../../components/Spinner';
import Fixtures from '../../containers/FixturesContainers';
import Live from '../../containers/LiveContainer/index';
import MyTeam from '../../containers/MyTeam';

import Sidebar from '../../components/Sidebar';
import PlayersContainer from '../PlayersContainer';

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

export const HomeLeagueOverview = createStackNavigator({
  HomeContainer: {
    screen: HomeContainer,
    navigationOptions: {
      header: null,
    },
  },
  LeagueDetails: {
    screen: LeagueDetails,
    navigationOptions: {
      header: null,
    },
  },
});

const screens = {
  Home: HomeLeagueOverview,
  Profile,
  Fixtures: MatchStats,
  Live,
  'My Team': MyTeam,
  Players: PlayersContainer,
};

const contentComponent = {
  contentComponent: Sidebar,
};

export const SignedIn = createDrawerNavigator(screens, contentComponent);

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
