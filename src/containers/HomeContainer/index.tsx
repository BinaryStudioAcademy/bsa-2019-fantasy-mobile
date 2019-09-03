import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';

import { RootState } from '../../store/types';
import { loadGameweeksHistoryAction, loadTeamHistoryAction } from './actions';
import { loadUserLeagues } from '../LeaguesContainer/actions';

import Leagues from './components/Leagues';
import PlayerList from '../../components/PlayerList';
import Spinner from '../../components/Spinner';

const HomeContainer = ({ gameweeks, gameweeksHistory, teamHistory, leagues }) => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  const [currentGameweek, setCurrentGameweek] = useState<number>(1);

  useEffect(() => {
    if (userId) {
      dispatch(loadUserLeagues(userId));
      dispatch(loadGameweeksHistoryAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      setCurrentGameweek(gameweeksHistory[0].gameweek.number);
    }
  }, [gameweeksHistory]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      const idx = gameweeksHistory.findIndex((gw) => {
        return gw.gameweek.number === currentGameweek;
      });
      if (idx !== -1) {
        const gameweekId = gameweeksHistory[idx].gameweek.id;
        dispatch(loadTeamHistoryAction(userId, gameweekId, currentGameweek));
      }
    }
  }, [currentGameweek, gameweeksHistory.length]);
  console.log(leagues);


  if (!gameweeksHistory && !leagues) {
    return <Spinner />;
  }

  console.log('teamHistory', teamHistory);

  return (
    <View style={{flex: 1}}>
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
        backgroundColor={'#122737'}
      />
      <ScrollView>
        <Text>{`Gameweek ${currentGameweek}`}</Text>
        <PlayerList players={teamHistory} />
        <Leagues data={leagues} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.gameweeks.gameweeks,
  userRank: rootState.gameweeks.user_rank,
  gameweeksResult: rootState.gameweeks.gameweeks_result,
  gameweeksHistory: rootState.gameweekHistory.gameweeksHistory,
  teamHistory: rootState.gameweekHistory.teamHistory,
  isLoading: rootState.gameweekHistory.isLoading,
  leagues: rootState.league.leagues,
});


const actions = {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  loadUserLeagues
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
