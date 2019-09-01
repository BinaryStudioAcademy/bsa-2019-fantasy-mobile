import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

import { RootState } from '../../store/types';
import { loadGameweeksHistoryAction } from './actions';

import Spinner from '../../components/Spinner'

const HomeContainer = ({ gameweeks }) => {
  if (!gameweeks) {
    return <Spinner />;
  }
  
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
      <Text>Home page</Text>
    </View>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.gameweeks.gameweeks,
});


const actions = {
  loadGameweeksHistoryAction,
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
