import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';

import {createAppContainer} from 'react-navigation';

import {createRootNavigator} from '../containers/Routing/router';

import {loadCurrentUser} from '../containers/Auth/action';
import {RootState} from '../store/types';

const App = () => {
  const dispatch = useDispatch();
  const {isLoading, user, isAuthorized} = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  const Navigartor = createRootNavigator(isAuthorized);
  const Routing = createAppContainer(Navigartor);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <Routing />;
};

export default App;
