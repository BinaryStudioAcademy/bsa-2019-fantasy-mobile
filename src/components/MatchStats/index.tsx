import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Text as CustomText, Card } from 'react-native-elements';

type Props = {
  title: string;
  hometeam_stats: any;
  awayteam_stats: any;
};

const MatchStats = ({ title, hometeam_stats, awayteam_stats }: Props) => {
  const mapArray = (array: any) =>
    array.map((item: any) => (
      <View
        style={{
          height: 30,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          padding: 5,
        }}
        key={`stats-item-${item.player}`}
      >
        <Text numberOfLines={1}>
          <Text style={{ width: '50%', overflow: 'hidden' }}>
            {item.player.length > 18 ? item.player.substring(0, 15) + '...' : item.player}
          </Text>{' '}
          <Text style={{ width: '30%' }}>( {item.count} )</Text>
        </Text>
      </View>
    ));

  const renderTitle = () => {
    return (
      <View style={{ padding: 15, marginBottom: 5 }}>
        <CustomText h3>{title}</CustomText>
      </View>
    );
  };

  const maxLength = Math.max(hometeam_stats.length, awayteam_stats.length);

  return (
    <Card
      title={renderTitle()}
      titleStyle={{ textAlign: 'left', color: '#1a1a1a' }}
      containerStyle={styles.card}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: maxLength === 1 ? 80 : maxLength * 45,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            width: '50%',
            alignContent: 'flex-end',
            marginLeft: 'auto',
            borderRightColor: 'black',
            borderStyle: 'dotted',
            borderRightWidth: 1,
            padding: 10,
          }}
        >
          {mapArray(hometeam_stats)}
        </View>
        <View style={{ padding: 10, width: '50%' }}>{mapArray(awayteam_stats)}</View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  card: {
    borderRadius: 5,
    marginBottom: 25,
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
    borderColor: 'transparent',
  },
});

export default MatchStats;
