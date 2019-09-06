import React from 'react';
import {map} from 'lodash/map';
import {StyleSheet, View, Text} from 'react-native';
import {Text as CustomText, Button, Header} from 'react-native-elements';
import {Table, Row, Rows} from 'react-native-table-component';

const LeagueTable = ({columns, data, title}: any) => {
  const tableData = [];

  if (data && data.length) {
    data.map(item => {
      return tableData.push([
        item.current_rank,
        item.league.name,
        item.total_points,
      ]);
    });


  }

  return (
    <View style={styles.container}>
      <CustomText
        h4
        style={{paddingHorizontal: 15, marginBottom: 5}}
        h4Style={{fontSize: 20}}>
        {title.title}
      </CustomText>
      <Table>
        <Row data={columns} style={styles.head} textStyle={styles.text} />
        {!tableData.length ? (
          <Text style={styles.empty}>Nothing to show</Text>
        ) : (
          <Rows data={tableData} style={{paddingLeft: 14, paddingVertical: 7, paddingRight: 5}} />
        )}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginBottom: 10, backgroundColor: '#fff'},
  head: {backgroundColor: '#666', padding: 14},
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
  empty: {textAlign: 'center', marginVertical: 20, textTransform: 'uppercase', fontSize: 10},
});

export default LeagueTable;