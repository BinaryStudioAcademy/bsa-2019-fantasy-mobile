import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

import moment from 'moment';

import FixturesItem from './FixturesItem';
import {FixturesType, FixturesItemType} from '../../types/fixtures.types';

const Fixtures = ({games}: any) => {
  const renderMessages = () => {
    let currentDate = '';

    return games.map((match: FixturesItemType) => {
      const res = [<FixturesItem match={match} key={`fixtures-${match.id}`} />];

      const messageDate = moment(match.start).format('dddd D MMMM YYYY');
      if (currentDate !== messageDate) {
        res.unshift(
          <View key={`daystamp-${messageDate}`}>
            <Text>{messageDate}</Text>
          </View>,
        );
        currentDate = messageDate;
      }

      return res;
    });
  };
  return (
    <View style={{flex: 1}}>
      {renderMessages()}
    </View>
  );
};

export default Fixtures;
