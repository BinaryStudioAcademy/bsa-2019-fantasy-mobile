import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

import { Position, PlayerType } from '../../types/player.types';
// import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from '../../helpers/images';


const PlayerList = ({ players: givenPlayers }) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const players = useMemo(
    () =>
      clubs.length > 0
        ? givenPlayers.map((p) => ({
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
  console.log('players', players)

  const { GKP, DEF, MID, FWD } = Position;

  const goalkeepers = players.filter(({ player_stats }) => {
    return player_stats.player_stats.position === GKP ? true : false;
  });
  const defenders = players.filter(({ player_stats }) => {
    return player_stats.player_stats.position === DEF ? true : false;
  });
  const midfielders = players.filter(({ player_stats }) => {
    return player_stats.player_stats.position === MID ? true : false;
  });
  const forwards = players.filter(({ player_stats }) => {
    return player_stats.player_stats.position === FWD ? true : false;
  });

  console.log(forwards, midfielders, defenders);

  const column1 = ['', 'Goalkeepers', '£', '**'];
  const column2 = ['', 'Defenders', '£', '**'];
  const column3 = ['', 'Midfielders', '£', '**'];
  const column4 = ['', 'Forwards', '£', '**'];

  const getData = (players) => {
    const result = [];
    players.map(player => {
      console.log('player', player);
      const { player_stats } = player.player_stats;
      return result.push(['', player_stats.second_name, player_stats.player_price, player_stats.player_score])
    })

    console.log('res', result);

    return result;
  }

  return (
    <View>
      <Text>Players List</Text>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={column1} style={{backgroundColor: '#6c7ae0', padding: 15, color: '#fff'}} />
        <Rows data={getData(goalkeepers)} />
        <Row data={column2} style={{backgroundColor: '#6c7ae0', padding: 15, color: '#fff'}} />        
        <Rows data={getData(defenders)} />
        <Row data={column3} style={{backgroundColor: '#6c7ae0', padding: 15, color: '#fff'}} />        
        <Rows data={getData(midfielders)} />
        <Row data={column4} style={{backgroundColor: '#6c7ae0', padding: 15, color: '#fff'}} />        
        <Rows data={getData(forwards)} />
      </Table>
    </View>
  );
};

export default PlayerList;

