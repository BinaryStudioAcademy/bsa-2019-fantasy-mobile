import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import {Text as CustomText, Button} from 'react-native-elements';

import {RootState} from '../../store/types';

import {players} from '../../images/uniforms/field-players';
import {goalkeepers} from '../../images/uniforms/goalkeepers';

const PlayerItem = ({player}) => {
  const {display, player_stats} = player;

  const clubName = useSelector(
    (state: RootState) =>
      state.clubs.clubs[player_stats.club_id - 1].short_name,
  );

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 10}}>
      {player_stats.position === 'GKP' ? (
        <Image
          source={goalkeepers[`shirt_${display.src}_1-66`]}
          style={{width: 50, height: 50}}
        />
      ) : (
        <Image
          source={players[`shirt_${display.src}-66`]}
          style={{width: 50, height: 50}}
        />
      )}
      <View style={{marginLeft: 20}}>
        <Text style={styles.name}>{`${player_stats.first_name} ${player_stats.second_name}`}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{clubName}</Text>
          <Text style={{marginLeft: 15}}>{player_stats.position}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{player_stats.player_price}</Text>
          <Text>{player_stats.player_score}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {fontWeight: 'bold', fontSize: 15}
});

export default PlayerItem;