import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Text as CustomText, Button, Header} from 'react-native-elements';

import {map} from 'lodash';

import LeagueTable from '../../../components/LeagueTable';

const Leagues = ({data}: any) => {
  const columns = ['Rank', 'Title', 'Total Points'];

  const titles = [
    {
      title: 'Private Leagues',
      id: '0',
      accessor: 'private',
    },
    {
      title: 'Public Leagues',
      id: '1',
      accessor: 'public',
    },
    {
      title: 'Global Leagues',
      id: '2',
      accessor: 'global',
    },
  ];

  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <CustomText h4>Users Leagues</CustomText>
      </View>
      {map(titles, item => {
        return (
          <View>
            <LeagueTable
              columns={columns}
              data={data[item.accessor]}
              title={item}
              key={item.id}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
});

export default Leagues;