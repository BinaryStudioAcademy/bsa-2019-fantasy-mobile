import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {View, Text, ScrollView} from 'react-native';
import {Text as CustomText, Button, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../../store/types';
import {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  setCurrentGameweekAction,
} from './actions';
import {loadUserLeagues} from '../LeaguesContainer/actions';

import Leagues from './components/Leagues';
import PlayerList from '../../components/PlayerList';
import Spinner from '../../components/Spinner';

const HomeContainer = ({
  gameweeks,
  gameweeksHistory,
  teamHistory,
  leagues,
  isLoading,
  currentGameweek,
}) => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  useEffect(() => {
    if (userId) {
      dispatch(loadUserLeagues(userId));
      dispatch(loadGameweeksHistoryAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      const idx = gameweeksHistory.findIndex(gw => {
        return gw.gameweek.number === currentGameweek;
      });
      if (idx !== -1) {
        const gameweekId = gameweeksHistory[idx].gameweek.id;
        dispatch(loadTeamHistoryAction(userId, gameweekId, currentGameweek));
      }
    }
  }, [currentGameweek, gameweeksHistory.length]);
  console.log(currentGameweek);

  if (!gameweeksHistory && !leagues && !teamHistory.length) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  console.log('history', gameweeksHistory);

  return (
    <View>
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}>
          <CustomText h3>{`Gameweek ${currentGameweek}`}</CustomText>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{width: '30%', marginLeft: 20, marginTop: 10}}>
              <Button
                buttonStyle={{backgroundColor: 'green'}}
                title="Previous"
                onPress={() =>
                  dispatch(setCurrentGameweekAction(currentGameweek - 1))
                }
                disabled={currentGameweek <= 1}
              />
            </View>
            <View style={{width: '30%', marginRight: 20, marginTop: 10}}>
              <Button
                buttonStyle={{backgroundColor: 'green'}}
                title="Next"
                onPress={() =>
                  dispatch(setCurrentGameweekAction(currentGameweek + 1))
                }
                disabled={currentGameweek >= gameweeksHistory.length}
              />
            </View>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <PlayerList players={teamHistory} />
        )}
        <Leagues data={leagues} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.gameweeks.gameweeks,
  gameweeksHistory: rootState.gameweekHistory.gameweeksHistory,
  currentGameweek: rootState.gameweekHistory.currentGameweek,
  teamHistory: rootState.gameweekHistory.teamHistory,
  isLoading: rootState.gameweekHistory.isLoading,
  leagues: rootState.league.leagues,
});

const actions = {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  loadUserLeagues,
  setCurrentGameweekAction,
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);