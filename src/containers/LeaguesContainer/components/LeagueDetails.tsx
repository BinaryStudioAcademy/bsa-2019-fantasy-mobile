import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Text, Text as CustomText } from 'react-native-elements';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';

import { primaryColor } from '../../../styles/common';


const LeagueDetails = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          // @ts-ignore: Unreachable code error
          underlayColor: 'rgba(0, 0, 0, 0.2)',
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{ text: 'Live', style: { color: '#fff', fontSize: 20 } }}
        backgroundColor={primaryColor}
      />

      <Text>League Details</Text>
    </View>
  );
};

export default LeagueDetails;
