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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

const TeamModal = ({
  player: { item: player, canBeSwitched, inSwitcheroo },
  onClose,
  onSetCaptain,
  onSetViceCaptain,
  onSwitch,
  onCancel,
}) => {
  console.log('modal', player);

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
              padding: 20,
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <View>
              <CustomText h4 />
            </View>
            {canBeSwitched && (
              <Button
                onPress={() => {
                  inSwitcheroo ? onCancel() : onSwitch();
                }}
                title={inSwitcheroo ? 'Cancel' : 'Switch'}
              />
            )}
            {!player.is_on_bench && (
              <View>
                {!player.is_captain && (
                  <Button
                    buttonStyle={{ marginBottom: 10 }}
                    onPress={() => onSetCaptain()}
                    title=' Make Captain'
                  />
                )}
                {!player.is_vice_captain && (
                  <Button
                    buttonStyle={{ marginBottom: 10 }}
                    onPress={() => onSetViceCaptain()}
                    title='Make Vice-Captain'
                  />
                )}
              </View>
            )}
            <Button
              buttonStyle={{ marginTop: 50 }}
              onPress={() => {
                onClose();
              }}
              title='Hide Modal'
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamModal;