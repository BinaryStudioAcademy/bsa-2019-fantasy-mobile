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
      <View style={{width: 150, height: 30}} key={`stats-item-${item.player}`}>
        <Text>
          {item.player} <Text>( {item.count} )</Text>
        </Text>
      </View>
    ));

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: 'green',
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
        }}>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-end',
            borderRightColor: 'black',
            borderRightWidth: 2,
            borderStyle: 'solid',
            backgroundColor: 'red',
          }}>
          {mapArray(hometeam_stats)}
        </View>
        <View style={{width: '50%', backgroundColor: 'red'}}>
          {mapArray(awayteam_stats)}
        </View>
      </View>
    </View>
  );
};

export default MatchStats;
