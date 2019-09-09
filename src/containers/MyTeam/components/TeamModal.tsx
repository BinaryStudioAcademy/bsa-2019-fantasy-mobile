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

import { primaryColor, primaryDarkColor } from '../../../styles/common';

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
            <View style={{ backgroundColor: primaryDarkColor }}>
              <CustomText h4>
                <Text>{`[${player.player_stats.position}]`}</Text>
                {player.player_stats.second_name}
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
              <View>
                {canBeSwitched && (
                  <Button
                    buttonStyle={{ marginBottom: 10, backgroundColor: primaryColor }}
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
                        buttonStyle={{ marginBottom: 10, backgroundColor: primaryColor }}
                        onPress={() => onSetCaptain()}
                        title=' Make Captain'
                      />
                    )}
                    {!player.is_vice_captain && (
                      <Button
                        buttonStyle={{ marginBottom: 10, backgroundColor: primaryColor }}
                        onPress={() => onSetViceCaptain()}
                        title='Make Vice-Captain'
                      />
                    )}
                  </View>
                )}
              </View>
              <Button
                buttonStyle={{
                  backgroundColor: primaryColor,
                }}
                onPress={() => {
                  onClose();
                }}
                title='Hide Modal'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamModal;
