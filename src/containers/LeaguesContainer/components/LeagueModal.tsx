import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import { Text as CustomText, Button } from 'react-native-elements';

import { primaryColor } from '../../../styles/common';
import { useDispatch } from 'react-redux';
import { deleteLeagueDetails } from '../actions';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

const LeagueModal = (props: any) => {
  const dispatch = useDispatch();

  return (
    <View style={{ marginTop: 22 }}>
      <Modal animationType='fade' transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000080',
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#fff',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <View
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <CustomText h4 style={{ color: '#fff' }}>
                {props.leagueName}
              </CustomText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <ScrollView>
                {props.participants.map((participant: any) => (
                  <Text key={participant.user.name}>{participant.user.name}</Text>
                ))}
              </ScrollView>
              <Button
                buttonStyle={{
                  backgroundColor: primaryColor,
                  marginTop: 20
                }}
                onPress={() => console.log('Close')}
                title='Hide'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LeagueModal;
