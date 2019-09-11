import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Text as CustomText } from 'react-native-elements';
import { Table, Row } from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { loadLeagueDetails, deleteLeagueDetails } from '../actions';
import { RootState } from '../../../store/types';
import LeagueModal from './LeagueModal';

const LeagueTable = ({ columns, data, title, navigation }: any) => {
  const dispatch = useDispatch();
  const tableData: any = [];
  const leagueDetails = useSelector((state: RootState) => state.league.leagueDetails);

  if (data && data.length) {
    data.map((item: any) => {
      return tableData.push([item.current_rank, item.league.name, item.total_points]);
    });
  }

  console.log(leagueDetails);

  return (
    <View style={styles.container}>
      <CustomText
        h4
        style={{ paddingHorizontal: 15, marginBottom: 5 }}
        h4Style={{ fontSize: 20 }}
      >
        {title.title}
      </CustomText>
      <Table>
        <Row data={columns} style={styles.head} textStyle={styles.text} />
        {!tableData.length ? (
          <Text style={styles.empty}>Nothing to show</Text>
        ) : (
          tableData.map((leagueData: string[]) => (
            <TouchableOpacity
              key={leagueData[1]}
              onPress={() => {
                // dispatch(loadLeagueDetails(leagueData[1]));
                navigation.navigate('LeagueDetails');
              }}
            >
              <Row
                data={leagueData}
                style={{ paddingLeft: 14, paddingVertical: 7, paddingRight: 5 }}
              />
            </TouchableOpacity>
          ))
        )}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 10, backgroundColor: '#fff' },
  head: { backgroundColor: '#666', padding: 14 },
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
  empty: {
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase',
    fontSize: 10,
  },
});

export default LeagueTable;
