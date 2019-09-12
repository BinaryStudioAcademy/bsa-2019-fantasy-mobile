import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text as CustomText, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerList from '../../../components/PlayerList';

const HomePlayerList = ({players: givenPlayers}) => {
  const renderTitle = () => {
    return (
      <View style={{ paddingHorizontal: 15, marginBottom: 5 }}>
        <CustomText h3>Players List</CustomText>
      </View>
    );
  };

  return (
    <View style={{textAlign: 'left', color: '#1a1a1a', marginBottom: 10 }}>
      {renderTitle()}
      <PlayerList players={givenPlayers} />
    </View>
  );
};

export default HomePlayerList;
