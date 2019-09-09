import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import produce, { applyPatches } from 'immer';

import { RootState } from '../../store/types';

import { postGameweekHistory } from '../../containers/Routing/fetchGameweeks/actions';
import { currentGameweekSelector } from '../../store/selectors/current-gameweek.selector';

export const useMyTeam = () => {
  const dispatch = useDispatch();

  const currentGameweek = useSelector(currentGameweekSelector);
  const teamPlayers = useSelector(
    (state: RootState) => state.gameweeks.gameweeks_history,
  );

  const [pitchPlayers, setPitch] = useState([]);

  const [openedPlayer, setOpenedPlayer] = useState(null);

  const [switcheroo, setSwitcheroo] = useState([]);
  const [switchQuery, setSwitchQuery] = useState([]);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setChanged(false);

    teamPlayers.forEach((item) => {
      item.highlight = 'transparent';
    });

    setPitch(teamPlayers);
  }, [teamPlayers]);

  const removeHighlights = () => {
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        draft.forEach((p, idx) => {
          if (p) {
            draft[idx].highlight = 'transparent';
          }
        });
      }),
    );
  };

  const addHighlights = () => {
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        draft.forEach((p, idx) => {
          if (p && p.accept.includes(switcheroo[0].item.player_stats.position)) {
            if (p.player_stats.id === switcheroo[0].item.player_stats.id) {
              draft[idx].highlight = 'rgba(255, 255, 0, 0.6)';
            } else {
              draft[idx].highlight = 'rgba(255, 102, 0, 0.6)';
            }
          }
        });
      }),
    );
  };

  useEffect(() => {
    if (switcheroo.length === 0) {
      removeHighlights();
    } else if (switcheroo.length === 1) {
      addHighlights();
    } else if (switcheroo.length === 2) {
      setSwitchQuery((q) => [...q, switcheroo]);
      setSwitcheroo([]);
    }
  }, [switcheroo]);

  const handleOpenModal = (player) => {
    const newOpenedPlayer = pitchPlayers.find(
      (p) => p && p.player_stats.id === player.player_stats.id,
    );

    if (newOpenedPlayer) {
      setOpenedPlayer({
        item: newOpenedPlayer,
        inSwitcheroo: switcheroo.some(
          (v) =>
            v &&
            newOpenedPlayer &&
            v.item.player_stats.id === newOpenedPlayer.player_stats.id,
        ),
        canBeSwitched:
          switcheroo.length === 0 ||
          switcheroo.some((v) => {
            return newOpenedPlayer.accept.includes(v.item.player_stats.position);
          }),
      });
    }
  };

  const closeModal = () => {
    setOpenedPlayer(null);
  };

  const addPlayerToSwitcheroo = () => {
    openedPlayer && setSwitcheroo((s) => [...s, openedPlayer]);
    closeModal();
  };

  const clearSwitcheroo = () => {
    setSwitcheroo([]);
    closeModal();
  };

  const handleSetMain = (assignment: 'is_captain' | 'is_vice_captain') => () => {
    const otherKey = assignment === 'is_captain' ? 'is_vice_captain' : 'is_captain';

    if (openedPlayer) {
      setPitch((pitch) =>
        produce(pitch, (draft) => {
          /* eslint-disable @typescript-eslint/no-non-null-assertion */
          const currentCaptain = draft.find((p) => p && p[assignment]);

          const currentViceCaptain = draft.find((p) => p && p[otherKey]);

          const currentPlayer = draft.find(
            (p) => p && p.player_stats.id === openedPlayer.item.player_stats.id,
          );

          /* eslint-enable @typescript-eslint/no-non-null-assertion */

          if (currentPlayer.player_stats.id === currentViceCaptain.player_stats.id) {
            currentViceCaptain[otherKey] = false;
            currentViceCaptain[assignment] = true;
            currentCaptain[otherKey] = true;
          }

          currentPlayer[assignment] = true;
          currentCaptain[assignment] = false;
        }),
      );
    }

    setChanged(true);
    closeModal();
  };

  const refreshAccepts = () => {
    setPitch((pitch) =>
      produce(pitch, (draft) => {
        const amountsMap = draft.reduce(
          (acc, p) => {
            if (!p || p.player_stats.position === 'GKP' || p.is_on_bench) {
              return acc;
            } else {
              const count = acc[p.player_stats.position];
              return { ...acc, [p.player_stats.position]: count + 1 };
            }
          },
          { DEF: 0, MID: 0, FWD: 0 },
        );
        const canBeSwitchedMap = {
          DEF: amountsMap.DEF < 5,
          MID: amountsMap.MID < 5,
          FWD: amountsMap.FWD < 3,
        };

        const availablePositions = Object.entries(canBeSwitchedMap)
          .filter((v) => v[1])
          .map((v) => v[0]);

        draft.forEach((p, idx) => {
          if (p.player_stats.position !== 'GKP') {
            const newAccepts = new Set([...availablePositions, p.player_stats.position]);

            const amount = amountsMap[p.player_stats.position];
            if (
              (p.player_stats.position === 'DEF' && amount === 3) ||
              (p.player_stats.position === 'MID' && amount === 3) ||
              (p.player_stats.position === 'FWD' && amount === 1)
            ) {
              newAccepts.clear();
              newAccepts.add(p.player_stats.position);
            }

            draft[idx].accept = [...newAccepts];
          } else {
            draft[idx].accept = ['GKP'];
          }
        });
      }),
    );
  };

  const runValidations = (players = pitchPlayers) => {
    const amountsMap = players.reduce(
      (acc, p) => {
        if (!p || p.player_stats.position === 'GKP' || p.is_on_bench) {
          return acc;
        } else {
          const count = acc[p.player_stats.position];
          return { ...acc, [p.player_stats.position]: count + 1 };
        }
      },
      { DEF: 0, MID: 0, FWD: 0 },
    );

    const validMap = {
      DEF: amountsMap.DEF >= 3 && amountsMap.DEF <= 5,
      MID: amountsMap.MID >= 3 && amountsMap.MID <= 5,
      FWD: amountsMap.FWD >= 1 && amountsMap.FWD <= 3,
    };

    if (!validMap.DEF) {
      showMessage({
        icon: 'danger',
        message: 'Your team should have 3-5 defenders',
        type: 'danger',
      });
    }

    if (!validMap.MID) {
      showMessage({
        icon: 'danger',
        message: 'Your team should have 3-5 middlefielders',
        type: 'danger',
      });
    }

    if (!validMap.FWD) {
      showMessage({
        icon: 'danger',
        message: 'Your team should have 1-3 forwards',
        type: 'danger',
      });
    }

    return !Object.values(validMap).some((v) => !v);
  };

  const handlePlayerSwitch = (target, player, immer_reverse) => {
    return (newPlayers) => {
      const isValid = runValidations(newPlayers);
      if (!isValid) {
        setPitch((pitch) => applyPatches(pitch, immer_reverse));
      }

      refreshAccepts();
      removeHighlights();

      setChanged(true);
    };
  };

  useEffect(() => {
    if (pitchPlayers.length) {
      refreshAccepts();
    }
  }, [pitchPlayers.length, pitchPlayers.some((p) => p)]);

  const handleSubmit = () => {
    if (!pitchPlayers.some((p) => !p)) {
      const result = pitchPlayers.map((item) => ({
        is_on_bench: item.is_on_bench,
        is_captain: item.is_captain,
        is_vice_captain: item.is_vice_captain,
        player_id: item.player_stats.id,
      }));

      currentGameweek && dispatch(postGameweekHistory(currentGameweek.id, result));
    }
  };

  const playersToRender = useMemo(
    () =>
      produce(pitchPlayers, (draft) => {
        draft.forEach((p, idx) => {
          if (p.player_stats.position !== 'GKP') {
            draft[idx].accept = ['DEF', 'MID', 'FWD'];
          } else {
            draft[idx].accept = ['GKP'];
          }
        });
      }),
    [pitchPlayers],
  );

  return {
    players: playersToRender,
    setPlayers: setPitch,
    switchQuery,
    setSwitchQuery,
    changed,
    openedPlayer,
    handleOpenModal,
    handleCloseModal: closeModal,
    handleAddPlayer: addPlayerToSwitcheroo,
    handleCancelAddedPlayer: clearSwitcheroo,
    handleSetCaptain: handleSetMain('is_captain'),
    handleSetViceCaptain: handleSetMain('is_vice_captain'),
    handlePlayerSwitch,
    handleSubmit,
  };
};