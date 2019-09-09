import React, { useCallback, useState, useEffect } from 'react';
import { produce } from 'immer';

import { View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

import PlayerList from '../PlayerList';

import { primaryColor } from '../../styles/common';

type Props = {
  players;
  setPlayers: any;
  hasBench: boolean;
  onPlayerPress?: (player) => void;
  query?: any;
  setQuery?: any;
  submit?: {
    onSubmit: () => void;
    canSubmit: boolean;
    label: string;
  };
  disabled: boolean;
};

const TeamSelection = ({
  players,
  setPlayers,
  query,
  setQuery,
  onPlayerDrop,
  onPlayerPress,
  submit,
  hasBench = false,
  disabled = false,
}: Props) => {
  const handlePlayerDrop = useCallback(
    (targetIdx: number, targetIsOnBench: boolean) => (player) => {
      if (!disabled) {
        const target = players[targetIdx];

        if (!target || target.player_stats.id !== player.item.player_stats.id) {
          const playerOnPitchIdx = players.findIndex(
            (p) =>
              p === player.item ||
              (p && p.player_stats.id === player.item.player_stats.id),
          );
          const playerOnPitch = players[playerOnPitchIdx];

          let newPlayer = playerOnPitch
            ? {
                ...playerOnPitch,
              }
            : {
                is_captain: false,
                is_on_bench: false,
                is_vice_captain: false,
                ...target,
                player_id: player.item.player_stats.id,
                ...player.item,
              };

          let newTargetItem = target;
          if (hasBench && playerOnPitch && target) {
            const targetItem = target;
            const playerItem = playerOnPitch;

            const movedToBench = !playerItem.is_on_bench && targetIsOnBench;
            const movedFromBench = playerItem.is_on_bench && !targetIsOnBench;

            if (movedToBench || movedFromBench) {
              if (
                targetItem.is_captain ||
                targetItem.is_vice_captain ||
                playerItem.is_captain ||
                playerItem.is_vice_captain
              ) {
                console.log('Captain or vice captain cannot sit on bench!');

                return;
              }

              newTargetItem = { ...target };

              if (movedToBench) {
                newTargetItem.is_on_bench = false;
              } else if (movedFromBench) {
                newTargetItem.is_on_bench = true;
              }

              newPlayer.is_on_bench = targetIsOnBench;
            }
          }

          let immer_reverse;
          const newPlayers = produce(
            players,
            (draft) => {
              draft[targetIdx] = {
                accept: [newPlayer.player_stats.position],
                ...newPlayer,
              };
              if (playerOnPitchIdx !== -1) {
                const newTargetType = newTargetItem
                  ? newTargetItem.player_stats.position
                  : draft[playerOnPitchIdx].player_stats.position;

                draft[playerOnPitchIdx] = {
                  accept: [newTargetType],
                  ...newTargetItem,
                };
              }
            },
            (_, reversePatches) => {
              immer_reverse = reversePatches;
            },
          );

          const afterPlayerDrop =
            onPlayerDrop &&
            onPlayerDrop(
              newTargetItem,
              newPlayer,
              immer_reverse,
              playerOnPitchIdx === -1,
            );

          setPlayers(newPlayers);

          afterPlayerDrop && afterPlayerDrop(newPlayers);
        }
      }
    },
    [players, disabled, hasBench, onPlayerDrop, setPlayers],
  );

  useEffect(() => {
    if (query && query.length && setQuery) {
      setQuery((query) =>
        query.filter(([target, player]) => {
          const targetIdx = players.findIndex(
            (p) => p && p.player_stats.id === target.item.player_stats.id,
          );

          handlePlayerDrop(targetIdx, players[targetIdx].is_on_bench)(player);

          return false;
        }),
      );
    }
  }, [query, setQuery, handlePlayerDrop, players]);

  if (!players) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <React.Fragment>
        <PlayerList players={players} hasBench={hasBench} onPlayerPress={onPlayerPress} />
        {submit && (
          <Button
            buttonStyle={{ marginTop: 20, backgroundColor: primaryColor }}
            disabled={!submit.canSubmit}
            title={submit.label}
            onPress={() => submit.onSubmit()}
          />
        )}
      </React.Fragment>
    </View>
  );
};

export default TeamSelection;