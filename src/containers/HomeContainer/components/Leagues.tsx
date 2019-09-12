import React from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text as CustomText, Button, Header } from 'react-native-elements';

import { map } from 'lodash';

import LeagueTable from '../../LeaguesContainer/components/LeagueTable';

const Leagues = ({ data, navigation }: any) => {
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

  const renderTitle = () => {
    return (
      <View style={{ paddingHorizontal: 15, marginBottom: 5 }}>
        <CustomText h3>User Leagues</CustomText>
      </View>
    );
  };

  return (
    <View style={{ textAlign: 'left', color: '#1a1a1a' }}>
      {renderTitle()}

      {map(titles, (item) => {
        return (
          <LeagueTable
            columns={columns}
            data={data[item.accessor]}
            title={item}
            key={item.id}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
});

export default Leagues;
