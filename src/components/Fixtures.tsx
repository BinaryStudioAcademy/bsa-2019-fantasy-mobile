import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

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
      backgroundColor={'#122737'}
    />
    <Text>Fixtures page</Text>
  </View>
);

export default Home;
