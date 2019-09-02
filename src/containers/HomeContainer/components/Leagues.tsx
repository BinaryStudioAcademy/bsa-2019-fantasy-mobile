import React from 'react';
import { map } from 'lodash';
import { StyleSheet, View, Text } from 'react-native';

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
      {map(titles, item => {
        return (
          <LeagueTable
            columns={columns}
            data={data[item.accessor]}
            title={item}
            key={item.id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
});

export default Leagues;