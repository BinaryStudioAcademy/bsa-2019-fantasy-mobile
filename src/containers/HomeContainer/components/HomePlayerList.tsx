import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text as CustomText, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import PlayerList from '../../../components/PlayerList';

const HomePlayerList = ({players: givenPlayers}) => {
  const renderTitle = () => {
    return (
      <View style={{padding: 15, marginBottom: 5}}>
        <CustomText h3>Players List</CustomText>
        <Icon
          name="ios-football"
          size={40}
          color="#008000"
          style={styles.icon}
        />
      </View>
    );
  };

  return (
    <Card
      title={renderTitle()}
      titleStyle={{textAlign: 'left', color: '#1a1a1a'}}
      containerStyle={styles.card}>
      <PlayerList players={givenPlayers} />
    </Card>
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
  card: {
    borderRadius: 5,
    marginBottom: 20,
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
    borderColor: 'transparent',
  }
});

export default HomePlayerList;