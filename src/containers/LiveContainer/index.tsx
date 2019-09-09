import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Header, Text, Text as CustomText } from 'react-native-elements';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';

import { primaryColor } from '../../styles/common';
import { createComment } from './createComment';
import SingleComent from './SingleComent';

import { images } from '../../images/club-logos/index';

const LiveContainer = (props: any) => {
  const live = useSelector((state: RootState) => state.live);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const getClubById = (id: number) => {
    return clubs.find((club) => club.id === Number(id));
  };

  /* to avoid line break */
  const commentsFilteredEvents = live.events
    .filter((event: any) => event.name !== 'nothing')
    .reverse();
  const commentsLiveStats = {
    homeClub: getClubById(live.homeClubId),
    awayClub: getClubById(live.awayClubId),
    score: live.score,
  };

  const isMatchExist =
    commentsLiveStats.homeClub && commentsLiveStats.awayClub && commentsLiveStats.score;

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          // @ts-ignore: Unreachable code error
          underlayColor: 'rgba(0, 0, 0, 0.2)',
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{ text: 'Live', style: { color: '#fff', fontSize: 20 } }}
        backgroundColor={primaryColor}
      />
      <View style={{ flex: 1, padding: 20, backgroundColor: '#efefef' }}>
        <View style={{ marginBottom: 30 }}>
          <CustomText h3>Live Page</CustomText>
          <CustomText h4 h4Style={{ fontSize: 15 }}>
            Live football stream
          </CustomText>
        </View>
        <View style={{ marginBottom: 100 }}>
          {isMatchExist && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <View style={{ alignItems: 'center', width: 100 }}>
                <Image source={images[`badge_${commentsLiveStats.homeClub.code}_40`]} />
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                  {commentsLiveStats.homeClub.name}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                  {commentsLiveStats.score[0] + ' : ' + commentsLiveStats.score[1]}
                </Text>
              </View>
              <View style={{ alignItems: 'center', width: 100 }}>
                <Image source={images[`badge_${commentsLiveStats.awayClub.code}_40`]} />
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                  {commentsLiveStats.awayClub.name}
                </Text>
              </View>
            </View>
          )}
        </View>
        <ScrollView>
          {commentsFilteredEvents.map((event: any) =>
            ['startGame', 'endGame', 'stopGame', 'startTime', 'endTime', 'goal'].includes(
              event.name,
            ) ? (
              <Text key={event.text} style={{ fontWeight: 'bold' }}>
                <SingleComent text={createComment(event, commentsLiveStats)} />
              </Text>
            ) : (
              <Text key={event.text}>
                <SingleComent text={createComment(event, commentsLiveStats)} />
              </Text>
            ),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LiveContainer;
