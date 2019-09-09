import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { createAppContainer } from 'react-navigation';
import Spinner from './Spinner';

import { createRootNavigator } from '../containers/Routing/router';

import {
  fetchGameweeks,
  fetchGameweekHistory,
  fetchGameweekHistoryResults,
  fetchUserRankingForGameweek,
} from '../containers/Routing/fetchGameweeks/actions';
import { fetchClubs } from '../containers/Routing/fetchClubs/actions';

import { currentGameweekSelector } from '../store/selectors/current-gameweek.selector';

import { loadCurrentUser } from '../containers/Auth/action';
import { RootState } from '../store/types';
import * as socket from '../helpers/socket';

const App = () => {
  console.disableYellowBox = true;
  socket.startSocket();
  const dispatch = useDispatch();
  const { isLoading, user, isAuthorized } = useSelector(
    (state: RootState) => state.profile,
  );

  const favorite_club = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.favorite_club_id,
  );

  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  useEffect(() => {
    if (user && isAuthorized && favorite_club) {
      if (!joinedRoom) {
        setJoinedRoom(true);
        socket.joinRoom(favorite_club);
      }
      socket.requestGames(user.id);
    }
  }, [dispatch, user, isAuthorized, favorite_club]);

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(fetchClubs());
    dispatch(fetchGameweeks());
  }, [dispatch]);

  const currentGameweek = useSelector(currentGameweekSelector);

  useEffect(() => {
    if (user && currentGameweek) {
      dispatch(fetchGameweekHistory(user.id, currentGameweek.id));
      dispatch(fetchUserRankingForGameweek(user.id, currentGameweek.id));
      dispatch(fetchGameweekHistoryResults());
    }
  }, [dispatch, user, currentGameweek]);

  const Navigator = createRootNavigator(isAuthorized);
  const Routing = createAppContainer(Navigator);
  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Routing />
      <FlashMessage position='top' />
    </View>
  );
};

export default App;
