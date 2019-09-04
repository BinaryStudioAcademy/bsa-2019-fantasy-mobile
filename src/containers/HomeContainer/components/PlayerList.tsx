import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Text as CustomText, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';


import {map} from 'lodash';

import {Position, PlayerType} from '../../../types/player.types';
import {
  getFieldPlayersUniformUrl,
  getGoalkeepersUniformUrl,
} from '../../../helpers/loadUniformImages';

import {RootState} from '../../../store/types';

import PlayerItem from '../../../components/PlayerItem';

const PlayerList = ({players: givenPlayers}) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const {GKP, DEF, MID, FWD} = Position;

  const players = useMemo(
    () =>
      clubs.length > 0
        ? givenPlayers.map(p => ({
            player_stats: p.player_stats,
            display: {
              src: clubs[p.player_stats.club_id - 1].code,
            },
          }))
        : [],
    [clubs.length, givenPlayers],
  );

  const goalkeepers = players.filter(({player_stats}) => {
    return player_stats.position === GKP ? true : false;
  });
  const defenders = players.filter(({player_stats}) => {
    return player_stats.position === DEF ? true : false;
  });
  const midfielders = players.filter(({player_stats}) => {
    return player_stats.position === MID ? true : false;
  });
  const forwards = players.filter(({player_stats}) => {
    return player_stats.position === FWD ? true : false;
  });

  const renderTitle = () => {
    return (
      <View style={{padding: 15, marginBottom: 5}}>
        <CustomText h3>Players List</CustomText>
        <Icon name="ios-football" size={40} color="#008000" style={styles.icon} />
      </View>
    )
  }

  return (
    <Card
      title={renderTitle()}
      titleStyle={{textAlign: 'left', color: '#1a1a1a'}}
      containerStyle={styles.card}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.title}>Goalkeepers</Text>
          {goalkeepers.map(p => (
            <PlayerItem
              key={`player-goalkeeper-${p.player_stats.id}`}
              player={p}
            />
          ))}
        </View>
        <View>
          <Text style={styles.title}>Defenders</Text>
          {defenders.map(p => (
            <PlayerItem key={`player-defender-${p.player_stats.id}`} player={p} />
          ))}
        </View>
        <View>
          <Text style={styles.title}>Midfielders</Text>
          {midfielders.map(p => (
            <PlayerItem
              key={`player-midfielder-${p.player_stats.id}`}
              player={p}
            />
          ))}
        </View>
        <View>
          <Text style={styles.title}>Forwards</Text>
          {forwards.map(p => (
            <PlayerItem key={`player-forward-${p.player_stats.id}`} player={p} />
          ))}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  icon: { position: 'absolute', top: -12, right: -12, backgroundColor: '#b2d8b2', padding: 25, borderRadius: 999, zIndex: 100 },
  card: {borderRadius: 5, marginBottom: 20, position: 'relative', padding: 0, overflow: 'hidden', borderColor: 'transparent'},
  title: {fontWeight: 'bold', fontSize: 17},
});

export default PlayerList;