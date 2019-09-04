import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Text as CustomText, Button} from 'react-native-elements';

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
  return (
    <View>
      <CustomText h4>Players List</CustomText>
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
  );
};

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 17}
});


export default PlayerList;