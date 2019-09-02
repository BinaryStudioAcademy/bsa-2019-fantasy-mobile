import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

import moment from 'moment';

import FixturesItem from './FixturesItem';
import {FixturesType, FixturesItemType} from '../../types/fixtures.types';

const Fixtures = ({games, navigation}: any) => {
  const renderMessages = () => {
    let currentDate = '';

    return games.map((match: FixturesItemType) => {
      const res = [
        <FixturesItem
          match={match}
          navigation={navigation}
          key={`fixtures-${match.id}`}
        />,
      ];

      const messageDate = moment(match.start).format('dddd D MMMM YYYY');
      if (currentDate !== messageDate) {
        res.unshift(
          <View
            key={`daystamp-${messageDate}`}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#eee',
              padding: 5,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 14}}>{messageDate}</Text>
          </View>,
        );
        currentDate = messageDate;
      }

      return res;
    });
  };
  return <View>{renderMessages()}</View>;
};

export default Fixtures;
