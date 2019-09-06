import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text as CustomText, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerList from '../../../components/PlayerList';

const HomePlayerList = ({players: givenPlayers}) => {
  const renderTitle = () => {
    return (
      <View style={{padding: 15}}>
        <CustomText h3>Players List</CustomText>
      </View>
    );
  };

  return (
    <View style={{textAlign: 'left', color: '#1a1a1a'}}>
      {renderTitle()}
      <PlayerList players={givenPlayers} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: -12,
    right: -12,
    backgroundColor: '#b2d8b2',
    padding: 25,
    borderRadius: 999,
    zIndex: 100,
  },
});

export default HomePlayerList;