import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

const HomeContainer = (props: any) => {
  

  return (
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
        backgroundColor={'#122737'}
      />
      <Text>Home page</Text>
    </View>
  );
};

export default HomeContainer;