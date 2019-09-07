import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

import {primaryColor, primaryDarkColor} from '../../styles/common';

const Home = (props: any) => (
  <View style={{flex: 1}}>
    <Header
      containerStyle={{height: 60, paddingTop: 0}}
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        size: 30,
        onPress: () => props.navigation.openDrawer(),
      }}
      centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
      backgroundColor={primaryColor}
    />
    <Text>Home page</Text>
  </View>
);

export default Home;
