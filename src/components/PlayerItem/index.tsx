import React from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Text as CustomText, Button, Badge} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {RootState} from '../../store/types';

import {players} from '../../images/uniforms/field-players';
import {goalkeepers} from '../../images/uniforms/goalkeepers';

type Props = {
  players: any;
  onPlayerPress?: any;
};

const PlayerItem = ({player, onPlayerPress}: Props) => {
  const {display, player_stats} = player;

  const clubName = useSelector(
    (state: RootState) =>
      state.clubs.clubs[player_stats.club_id - 1].short_name,
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
      }}>
      <View style={{position: 'relative'}}>
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
        {onPlayerPress && player.is_captain && (
          <Badge status="primary" value="C" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
        )}
        {onPlayerPress && player.is_vice_captain && (
          <Badge status="primary" value="V" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
        )}
      </View>
      <View style={{marginLeft: 20}}>
        <Text style={styles.name}>{`${player_stats.first_name} ${
          player_stats.second_name
        }`}</Text>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
          <Text style={{fontWeight: 'bold'}}>{clubName}</Text>
          <Text style={{fontWeight: 'bold', marginLeft: 10}}>
            {player_stats.position}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.money}>
            <Icon name="coin" color="#b2b200" size={14} style={styles.icon} />
            {`${player_stats.player_price} coins`}
          </Text>
          <Text style={{marginLeft: 10}}>
            <Icon name="star-four-points" size={14} style={styles.icon} />
            {`${player_stats.player_score} points`}
          </Text>
        </View>
      </View>

      {onPlayerPress && (
        <Button onPress={() => onPlayerPress(player)}>plus</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {fontWeight: 'bold', fontSize: 15},
  icon: {marginRight: 5},
  money: {color: '#b2b200', fontSize: 14},
});

export default PlayerItem;