import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

import io from 'socket.io-client';
import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';

import { primaryColor, primaryDarkColor } from '../../styles/common';

const socket = io(
  'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5002',
);

const LiveContainer = (props: any) => {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    socket.on('event', (status: any) => {
      console.log('[SOCKET.IO]: Recieved event');
      console.log(status);
      setEventCount(eventCount + 1);
    });
  }, [eventCount]);

  return (
    <View style={{flex: 1}}>
      <GeneralStatusBarColor backgroundColor={primaryDarkColor} barStyle="light-content" />
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{text: 'Live', style: {color: '#fff', fontSize: 20}}}
        backgroundColor={primaryColor}
      />
      <Text>{eventCount} events have been emitted</Text>
    </View>
  );
};

export default LiveContainer;
