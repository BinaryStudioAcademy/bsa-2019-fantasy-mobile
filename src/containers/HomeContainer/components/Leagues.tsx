import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Text as CustomText, Button, Header, Card} from 'react-native-elements';

import {map} from 'lodash';

import Icon from 'react-native-vector-icons/Entypo';

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

  const LeagueComponentTitle = () => {
    return (
      <View style={{padding: 15, marginBottom: 5}}>
        <CustomText h3>User Leagues</CustomText>
        <Icon name="medal" size={40} color="#900" style={styles.icon} />
      </View>
    );
  };

  return (
    <Card
      title={LeagueComponentTitle()}
      titleStyle={{textAlign: 'left', color: '#1a1a1a'}}
      containerStyle={styles.card}>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  icon: { position: 'absolute', top: -12, right: -12, backgroundColor: '#eacccc', padding: 25, borderRadius: 999, zIndex: 100 },
  card: {borderRadius: 5, marginBottom: 100, position: 'relative', padding: 0, overflow: 'hidden', borderColor: 'transparent'}
});

export default Leagues;