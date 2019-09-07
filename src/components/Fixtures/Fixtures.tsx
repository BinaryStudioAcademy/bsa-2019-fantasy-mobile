import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import moment from 'moment';

import {RootState} from '../../store/types';
import FixturesItem from './FixturesItem';
import {FixturesType, FixturesItemType} from '../../types/fixtures.types';
import {FixtureSubscribtion} from '../../types/fixture.types';

const Fixtures = ({games, navigation}: any) => {
  const fixtureSubscribtions = useSelector(
    (state: RootState) => state.fixtures.fixtureSubscribtions,
  );
  const renderMessages = (subscribtions: FixtureSubscribtion[]) => {
    let currentDate = '';
    const subscribedFixturesIds = subscribtions.map(s => s.game_id);
    return games.map((match: FixturesItemType) => {
      const res = [
        <FixturesItem
          match={match}
          navigation={navigation}
          subscribed={subscribedFixturesIds.includes(match.id)}
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
  return (
    <View>
      {fixtureSubscribtions ? renderMessages(fixtureSubscribtions) : null}
    </View>
  );
};

export default Fixtures;
