import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';

import Spinner from './Spinner';

import {createRootNavigator} from '../containers/Routing/router';

import {
  fetchGameweeks,
  fetchGameweekHistory,
  fetchGameweekHistoryResults,
  fetchUserRankingForGameweek,
} from '../containers/Routing/fetchGameweeks/actions';
import { fetchClubs } from '../containers/Routing/fetchClubs/actions';

import { currentGameweekSelector } from '../store/selectors/current-gameweek.selector';

import {loadCurrentUser} from '../containers/Auth/action';
import {RootState} from '../store/types';

const App = () => {
  const dispatch = useDispatch();
  const {isLoading, user, isAuthorized} = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(fetchClubs());
    dispatch(fetchGameweeks());
  }, [dispatch]);

  const currentGameweek = useSelector(currentGameweekSelector);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <Routing />;
};

export default App;
