import React from 'react';
import { Table } from 'react-native-table-component';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { PlayerType } from 'src/types/player.types';
import { PlayersSorting } from '../../types';

import Player from '../Player';

import * as S from './styles';

type TableHeaderCellProps = {
  order: 'ASC' | 'DESC' | false;
  children: any;

  onPress: () => void;
};

const TableHeaderCell = ({ order, onPress, children }: TableHeaderCellProps) => {
  const style = {
    borderWidth: 3,
    borderColor: 'transparent',
    borderBottomColor: order === 'ASC' ? 'rgba(0, 0, 0, .1)' : 'transparent',
    borderTopColor: order === 'DESC' ? 'rgba(0, 0, 0, .1)' : 'transparent',

    paddingTop: 5,
    paddingBottom: 5,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style}>{children}</View>
    </TouchableOpacity>
  );
};

type Props = {
  players: PlayerType[];
  highlightedPlayer: PlayerType | null;

  sorting: PlayersSorting;
  changeSorting: (by: PlayersSorting['sortBy']) => void;

  onPlayerPress: (p: PlayerType) => void;
};

const Players = ({
  players,
  sorting,
  changeSorting,
  highlightedPlayer,
  onPlayerPress,
}: Props) => {
  const tableHeaders = [
    '',

    <TableHeaderCell
      order={sorting.sortBy === 'name' && sorting.order}
      onPress={() => changeSorting('name')}
      key='players-header-name'
    >
      <Text style={{ textAlign: 'center' }}>Name</Text>
    </TableHeaderCell>,

    <TableHeaderCell
      order={sorting.sortBy === 'player_score' && sorting.order}
      onPress={() => changeSorting('player_score')}
      key='players-header-scores'
    >
      <FaIcon style={{ alignSelf: 'center' }} name='star' size={18} />
    </TableHeaderCell>,

    <TableHeaderCell
      order={sorting.sortBy === 'player_price' && sorting.order}
      onPress={() => changeSorting('player_price')}
      key='players-header-price'
    >
      <Icon style={{ alignSelf: 'center' }} name='coin' size={18} />
    </TableHeaderCell>,
  ];

  return (
    <S.Container>
      <Table style={{ overflow: 'visible' }}>
        <S.TableHeader data={tableHeaders} flexArr={[0, 1, 0, 0]} />
        {players.map((p) => (
          <Player
            highlighted={!!highlightedPlayer && p.id === highlightedPlayer.id}
            onPress={onPlayerPress}
            item={p}
            key={`players-plr-${p.id}`}
          />
        ))}
      </Table>
    </S.Container>
  );
};

export default Players;
