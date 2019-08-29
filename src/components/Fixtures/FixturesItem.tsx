import React from 'react';
import moment from 'moment';
import {Text, View, Image} from 'react-native';
import { ListItem } from 'react-native-elements'

import {FixturesItemType} from '../../types/fixtures.types';

type Props = {
  match: FixturesItemType;
};

const FixturesItem = ({match}: Props) => {
  let label = <p>{moment(match.start).format('HH:mm')}</p>;

  if (match.started) {
    label = (
      <div>
        <p>{match.hometeam_score}</p>
        <p>{match.awayteam_score}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <View>
        <ListItem   >
          <View>
            <Image
              source={{
                uri: `../../images/club-logos/badge_${match.hometeam.code}_200.png`,
              }}
            />
            <Text>{match.hometeam.name}</Text>
          </View>
          <View>{label}</View>
          <View>
            <Image
              source={{
                uri: `../../images/club-logos/badge_${match.awayteam.code}_200.png`,
              }}
            />
            <Text>{match.awayteam.name}</Text>
          </View>
        </ListItem>
      </View>
    </React.Fragment>
  );
};

export default FixturesItem;
