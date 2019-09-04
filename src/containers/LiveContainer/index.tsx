import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import {RootState} from '../../store/types';
import {useSelector} from 'react-redux';

import {primaryColor} from '../../styles/common';
import {createComment} from './createComment';

const LiveContainer = (props: any) => {
  const live = useSelector((state: RootState) => state.live);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const getClubById = (id: number) => {
    return clubs.find(club => club.id === Number(id));
  };

  /* to avoid line break */
  const commentsFilteredEvents = live.events.filter((event: any) => event.name !== 'nothing');
  const commentsLiveStats = {
    homeClub: getClubById(live.homeClubId),
    awayClub: getClubById(live.awayClubId),
    score: live.score,
  };

  return (
    <View style={{flex: 1}}>
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{text: 'Live', style: {color: '#fff', fontSize: 20}}}
        backgroundColor={primaryColor}
      />
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontWeight: 'bold'}}>
          Current match:{' '}
          {commentsLiveStats.homeClub && commentsLiveStats.awayClub
            ? commentsLiveStats.homeClub.name +
              ' - ' +
              commentsLiveStats.awayClub.name
            : '-'}
        </Text>
        <Text style={{fontWeight: 'bold'}}>
          Current score:{' '}
          {commentsLiveStats.score
            ? commentsLiveStats.score[0] + ' : ' + commentsLiveStats.score[1]
            : '-'}
        </Text>
        <ScrollView>
          {commentsFilteredEvents.map((event: any) => {
              return (
                <Text key={event.text}>
                  {createComment(event, commentsLiveStats)}
                </Text>
              );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default LiveContainer;
