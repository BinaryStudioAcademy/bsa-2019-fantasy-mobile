import React, { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Header, Text as CustomText } from 'react-native-elements';
import { RootState } from '../../../store/types';
import { useSelector, useDispatch } from 'react-redux';

import { primaryColor } from '../../../styles/common';
import { loadLeagueDetails, deleteLeagueDetails } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

import { sortBy } from 'lodash';

const LeagueDetails = ({ navigation }: any) => {
  const leagueName = navigation.getParam('leagueName', {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLeagueDetails(leagueName));
  }, [leagueName]);

  const { leagueDetails, isLeagueDetailsLoading } = useSelector(
    (state: RootState) => state.league,
  );
  const { id } = useSelector((state: RootState) => state.profile.user);

  let sortedParticipants = [];

  if (leagueDetails && leagueDetails.participants) {
    sortedParticipants = sortBy(leagueDetails.participants, 'current_rank');
  }

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
              navigation.navigate('HomeContainer');
            }}
          />
        }
        centerComponent={{
          text: 'League Details',
          style: { color: '#fff', fontSize: 20 },
        }}
        backgroundColor={primaryColor}
      />

      <View style={{ flex: 1, padding: 20, backgroundColor: '#efefef' }}>
        <View style={{ marginBottom: 30 }}>
          <CustomText h3>{leagueName}</CustomText>
          <CustomText h4 h4Style={{ fontSize: 15 }}>
            League details
          </CustomText>
        </View>

        {isLeagueDetailsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <View>
            {sortedParticipants && (
              <ScrollView>
                <Table style={{ marginBottom: 100, backgroundColor: '#fff' }}>
                  <Row
                    data={['Rank', 'Name', 'GW', 'Total']}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  {sortedParticipants.map((participant: any) => (
                    <Row
                      data={[
                        participant.current_rank,
                        `${participant.user.name} (${participant.user.team_name})`,
                        participant.gameweek_points,
                        participant.total_points,
                      ]}
                      key={participant.user.name}
                      style={{ paddingLeft: 14, paddingVertical: 7 }}
                      textStyle={participant.user.id === id ? { fontWeight: 'bold' } : {}}
                    />
                  ))}
                </Table>
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: { backgroundColor: '#666', padding: 14 },
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LeagueDetails;
