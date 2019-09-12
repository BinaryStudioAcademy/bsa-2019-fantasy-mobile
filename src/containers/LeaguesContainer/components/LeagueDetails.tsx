import React, { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Header, Text as CustomText } from 'react-native-elements';
import { RootState } from '../../../store/types';
import { useSelector, useDispatch } from 'react-redux';

import { primaryColor } from '../../../styles/common';
import { loadLeagueDetails, deleteLeagueDetails } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const LeagueDetails = ({ navigation }: any) => {
  const leagueName = navigation.getParam('leagueName', {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLeagueDetails(leagueName));
  }, [leagueName]);

  const { leagueDetails, isLeagueDetailsLoading } = useSelector(
    (state: RootState) => state.league,
  );

  console.log(isLeagueDetailsLoading);

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={
          // @ts-ignore: Unreachable code error
          <Icon
            name='caret-left'
            size={30}
            color='#fff'
            underlayColor='rgba(0, 0, 0, 0.2)'
            onPress={() => {
              navigation.navigate('Home');
              dispatch(deleteLeagueDetails());
            }}
          />
        }
        centerComponent={{
          text: `${leagueName}`,
          style: { color: '#fff', fontSize: 20 },
        }}
        backgroundColor={primaryColor}
      />

      <View style={{ flex: 1, padding: 20, backgroundColor: '#efefef' }}>
        <View style={{ marginBottom: 30 }}>
          <CustomText h3>{leagueName}</CustomText>
          <CustomText h4 h4Style={{ fontSize: 15 }}>
            League Details
          </CustomText>
        </View>

        {isLeagueDetailsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <View>
            {leagueDetails && leagueDetails.participants && (
              <View>
                <CustomText h4 h4Style={{ fontSize: 15 }}>
                  Participants: {leagueDetails.participants.length}
                </CustomText>

                {leagueDetails.participants.map((participant: any) => (
                  <CustomText key={participant.user.name}>
                    {participant.user.name} ({participant.user.team_name})
                  </CustomText>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default LeagueDetails;
