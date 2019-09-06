import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Text, View, ScrollView, ActivityIndicator} from 'react-native';
import {Text as CustomText, Button, Card, Header} from 'react-native-elements';

import PlayerList from '../../components/PlayerList';
import TeamModal from './components/TeamModal';

import {useMyTeam} from './my-team.hook';

const MyTeam = () => {
  const {
    players,
    setPlayers,

    switchQuery,
    setSwitchQuery,

    changed,

    openedPlayer,
    handleOpenModal,
    handleCloseModal,

    handleAddPlayer,
    handleCancelAddedPlayer,
    handleSetCaptain,
    handleSetViceCaptain,

    handlePlayerSwitch,
    handleSubmit,
  } = useMyTeam();

  const dispatch = useDispatch();
  const [currentDialogPlayer, setCurrentDialogPlayer] = useState(null);

  return (
    <View style={{backgroundColor: '#efefef'}}>
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'My Team',
          style: {color: '#fff', fontSize: 20},
        }}
        backgroundColor={'#122737'}
      />
      <ScrollView>
        <View style={{paddingHorizontal: 15, marginVertical: 20}}>
          <CustomText h3>Team Page</CustomText>
          <CustomText h4 h4Style={{fontSize: 15}}>
            Choose your team there
          </CustomText>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingVertical: 15,
            marginBottom: 50
          }}>
          <PlayerList
            players={players}
            onPlayerPress={handleOpenModal}
            hasBench
            submit={{
              label: "Save Team",
              canSubmit: changed,
              onSubmit: handleSubmit,
            }}
          />
          {openedPlayer && (
            <TeamModal
              player={openedPlayer}
              onClose={handleCloseModal}
              onSetCaptain={handleSetCaptain}
              onSetViceCaptain={handleSetViceCaptain}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyTeam;
