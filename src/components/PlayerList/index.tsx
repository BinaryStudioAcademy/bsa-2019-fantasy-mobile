import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/types';

import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

import {Position, PlayerType} from '../../types/player.types';
// import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from '../../helpers/images';

const PlayerList = ({players: givenPlayers}) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const players = useMemo(
    () =>
      clubs.length > 0
        ? givenPlayers.map(p => ({
            player_stats: p,
            // display: {
            //   src:
            //     p.position === PlayerTypes.GOALKEEPER
            //       ? getGoalkeepersUniformUrl(clubs[p.club_id - 1].code)
            //       : getFieldPlayersUniformUrl(clubs[p.club_id - 1].code),
            // },
          }))
        : [],
    [clubs.length, givenPlayers],
  );
  console.log('players', players);

  const {GKP, DEF, MID, FWD} = Position;

  const goalkeepers = players.filter(({player_stats}) => {
    return player_stats.player_stats.position === GKP ? true : false;
  });
  const defenders = players.filter(({player_stats}) => {
    return player_stats.player_stats.position === DEF ? true : false;
  });
  const midfielders = players.filter(({player_stats}) => {
    return player_stats.player_stats.position === MID ? true : false;
  });
  const forwards = players.filter(({player_stats}) => {
    return player_stats.player_stats.position === FWD ? true : false;
  });

  console.log(forwards, midfielders, defenders);

  const column1 = ['', 'Goalkeepers', '£', '**'];
  const column2 = ['', 'Defenders', '£', '**'];
  const column3 = ['', 'Midfielders', '£', '**'];
  const column4 = ['', 'Forwards', '£', '**'];

  const getData = players => {
    const result = [];
    players.map(player => {
      console.log('player', player);
      const {player_stats} = player.player_stats;
      return result.push([
        '',
        player_stats.second_name,
        player_stats.player_price,
        player_stats.player_score,
      ]);
    });

    console.log('res', result);

    return result;
  };

  return (
    <View>
      <Text>Players List</Text>
      <Table>
        <Row data={column1} style={styles.head} textStyle={styles.text} />
        <Rows data={getData(goalkeepers)} style={styles.row} textStyle={styles.textRow} />
        <Row data={column2} style={styles.head} textStyle={styles.text} />
        <Rows data={getData(defenders)} style={styles.row} textStyle={styles.textRow} />
        <Row data={column3} style={styles.head} textStyle={styles.text} />
        <Rows data={getData(midfielders)} style={styles.row} textStyle={styles.textRow} />
        <Row data={column4} style={styles.head} textStyle={styles.text} />
        <Rows data={getData(forwards)} style={styles.row} textStyle={styles.textRow} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {backgroundColor: '#6c7ae0', padding: 14},
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
  row : {padding: 10, paddingLeft: 3, paddingRight: 3 },
  textRow: {color: '#666666'}
});

export default PlayerList;