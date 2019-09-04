import React, {useEffect, useState} from 'react';
import {View, Text, YellowBox, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';

import io from 'socket.io-client';
import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';

import {primaryColor, primaryDarkColor} from '../../styles/common';

const socket = io(
  'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5002',
);

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const LiveContainer = (props: any) => {
  const [eventCount, setEventCount] = useState(0); // counter
  const [eventsList, setEventToList] = useState([] as string[]); // live-events
  const [matchDescription, setMatchDescription] = useState('');

  useEffect(() => {
    socket.on('status', (status: any) => {
      if (status.gameStarted) {
        setMatchDescription(`${status.homeClubId} : ${status.awayClubId}`);
      }
    });
    socket.on('event', (data: any) => {
      setEventCount(eventCount + 1);
      setEventToList([...eventsList, data.text]);
    });
  }, [eventCount]);

  return (
    <View style={{flex: 1}}>
      <GeneralStatusBarColor
        backgroundColor={primaryDarkColor}
        barStyle="light-content"
      />
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
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontWeight: 'bold'}}>
          {eventCount} events have been emitted
        </Text>
        <Text style={{fontWeight: 'bold'}}>
          Current match (club ids): {matchDescription}
        </Text>
        <ScrollView>
          {eventsList.map((element: string) => (
            <Text key={element}>{element}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default LiveContainer;
