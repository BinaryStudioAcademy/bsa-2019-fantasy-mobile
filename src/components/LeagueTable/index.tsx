import React from 'react';
import {map} from 'lodash/map';
import {StyleSheet, View, Text} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const LeagueTable = ({columns, data, title}: any) => {

  const tableData = [];

  if (data && data.length) {
    data.map(item => {
      return tableData.push([item.current_rank, item.league.name, item.total_points]);
    });
  }

  return (
    <View>
      <Text>{title.title}</Text>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={columns} style={styles.head} textStyle={styles.text} />
        {!tableData.length ? (
          <Text style={styles.empty} >Nothing to show</Text>
        ) : (
          <Rows data={tableData} textStyle={styles.text} />
        )}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, marginBottom: 100, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  empty: { textAlign: 'center', marginTop: 10, marginBottom: 10 }
});

export default LeagueTable;