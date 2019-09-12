import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { RootState } from 'src/store/types';
import { PlayerType } from 'src/types/player.types';
import { getPlayerImageUrl } from 'src/helpers/images';

import * as S from './styles';
import { Card } from 'react-native-elements';

type BadgeProps = {
  icon: string;
  data: string | number;
};

const Badge = (props: BadgeProps) => {
  return (
    <S.Badge>
      <Icon name={props.icon} size={14} />
      <S.BadgeText>{props.data}</S.BadgeText>
    </S.Badge>
  );
};

type Props = {
  item: PlayerType;
  isPlayerOfTheWeek?: boolean;
};

const HighlightedPlayer = ({ item, isPlayerOfTheWeek }: Props) => {
  const clubName = useSelector(
    (state: RootState) => state.clubs.clubs[item.club_id - 1].name,
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [item]);

  return (
    <TouchableOpacity onPress={() => setIsOpen((v) => !v)} activeOpacity={1}>
      <Card
        containerStyle={{
          ...S.plain.card,
          ...S.plain.container,
          // elevation: isOpen ? 5 : 1,
        }}
      >
        <S.Container>
          {isPlayerOfTheWeek && <S.POTWStatement>Player of the Week</S.POTWStatement>}

          <S.Attributes>
            <S.Name>{`${item.first_name.slice(0, 1)}. ${item.second_name}`}</S.Name>
            <S.Club>{`${clubName}`}</S.Club>
            <S.Badges>
              <Badge icon='star' data={item.player_score} />

              {item.position === 'GKP' && (
                <Badge icon='thumbs-up' data={item.goals_conceded} />
              )}

              <Badge icon='thumbs-down' data={item.missed_passes} />

              {['MID', 'FWD'].includes(item.position) && (
                <Badge icon='futbol' data={item.goals} />
              )}
            </S.Badges>
          </S.Attributes>

          <Image
            source={{
              uri: getPlayerImageUrl(item.code, 500),
              height: 125,
              width: 125,
              scale: 0.4,
            }}
          />
        </S.Container>
      </Card>
    </TouchableOpacity>
  );
};

export default HighlightedPlayer;
