import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {Text, View, ScrollView, ActivityIndicator} from 'react-native';

import { useMyTeam } from './my-team.hook';

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
    // handleSubmit,
  } = useMyTeam();

  const dispatch = useDispatch();
  const [currentDialogPlayer, setCurrentDialogPlayer] = useState(null);

  const handleOpenInfo = (player) => {
    setCurrentDialogPlayer(player);
    dispatch(fetchDataForPlayer(player.id, player.club_id + ''));
    handleCloseModal();
  };

  const onModalDismiss = () => {
    dispatch(resetPlayerDialogData());
    setCurrentDialogPlayer(null);
  };

  return (
    <View>
      <Text>mey</Text>
    </View>
  )
}

export default MyTeam;