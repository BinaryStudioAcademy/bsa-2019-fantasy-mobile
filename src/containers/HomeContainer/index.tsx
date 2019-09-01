import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

import { RootState } from '../../store/types';
import { loadGameweeksHistoryAction, loadTeamHistoryAction } from './actions';

import Spinner from '../../components/Spinner'

const HomeContainer = ({ gameweeks, gameweeksHistory, teamHistory }) => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  const [currentGameweek, setCurrentGameweek] = useState<number>(1);

  useEffect(() => {
    if (userId) {
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

  if (!gameweeksHistory) {
    return <Spinner />;
  }

  console.log(gameweeksHistory, teamHistory);
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
      <Text>{`Gameweek ${currentGameweek}`}</Text>
      <View>
        {/* list team view */}
      </View>
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
});


const actions = {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
