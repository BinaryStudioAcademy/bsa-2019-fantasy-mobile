import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { PlayerType } from 'src/types/player.types';
import { Image } from 'react-native-elements';
import { getPlayerImageUrl } from 'src/helpers/images';

import * as S from './styles';

type Props = {
  item: PlayerType;
  highlighted: boolean;

  onPress: (p: PlayerType) => void;
};

const Player = ({ item: player, highlighted, onPress }: Props) => {
  const displayArray = [
    <Image
      key={`${player.id}-photo`}
      source={{
        uri: getPlayerImageUrl(player.code, 500),
        height: 50,
        width: 50,
        scale: 0.1,
      }}
    />,
    player.second_name,
    player.player_score,
    player.player_price,
  ];

  return (
    <TouchableOpacity onPress={() => onPress(player)}>
      <S.Container data={displayArray} flexArr={[0, 1, 0, 0]} highlighted={highlighted} />
    </TouchableOpacity>
  );
};

export default Player;
