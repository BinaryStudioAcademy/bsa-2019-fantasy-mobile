import React from 'react';
import {View, Text} from 'react-native';
import {Text as CustomText} from 'react-native-elements';

type Props = {
  title: string;
  hometeam_stats: any;
  awayteam_stats: any;
};

const MatchStats = ({title, hometeam_stats, awayteam_stats}: Props) => {
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
        key={`stats-item-${item.player}`}>
        <Text>
          {item.player} <Text>( {item.count} )</Text>
        </Text>
      </View>
    ));

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#2a683a',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText h4 h4Style={{color: 'white'}}>
          {title}
        </CustomText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: Math.max(hometeam_stats.length, awayteam_stats.length) * 45,
        }}>
        <View
          style={{
            width: '50%',
            alignContent: 'flex-end',
            marginLeft: 'auto',
            borderRightColor: 'black',
            borderStyle: 'dotted',
            borderRightWidth: 1,
            padding: 10,
          }}>
          {mapArray(hometeam_stats)}
        </View>
        <View style={{padding: 10, width: '50%'}}>
          {mapArray(awayteam_stats)}
        </View>
      </View>
    </View>
  );
};

export default MatchStats;
