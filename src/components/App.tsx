import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';

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

  const Navigator = createRootNavigator(isAuthorized);
  const Routing = createAppContainer(Navigator);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Routing />
      <FlashMessage position="top" style={{marginTop:20}} />
    </View>
  );
};

export default App;
