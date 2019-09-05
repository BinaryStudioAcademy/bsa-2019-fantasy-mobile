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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

const TeamModal = ({player, onClose}) => {
  return (
    <View style={{marginTop: 22}}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000080',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                onClose();
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamModal;