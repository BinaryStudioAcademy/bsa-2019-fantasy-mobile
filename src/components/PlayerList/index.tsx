import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {categorizePlayers} from '../../helpers/categorizePlayers.ts';
import {RootState} from '../../store/types';

import PlayerItem from '../PlayerItem';

type Props = {
  players;
  hasBench: boolean;
  onPlayerPress?: (player) => void;
};

const PlayerList = ({
  players: givenPlayers,
  hasBench,
  onPlayerPress,
}: Props) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const players = useMemo(
    () =>
      clubs.length > 0
        ? givenPlayers.map(p => ({
            player_stats: p.player_stats,
            display: {
              src: clubs[p.player_stats.club_id - 1].code,
            },
            is_on_bench: p.is_on_bench,
            is_captain: p.is_captain,
            is_vice_captain: p.is_vice_captain
          }))
        : [],
    [clubs.length, givenPlayers],
  );

  let categorizedPlayers: {[k: string]};
  if (hasBench) {
    categorizedPlayers = {
      Starters: players.filter(p => !p.is_on_bench),
      Substitutes: players.filter(p => p.is_on_bench),
    };
  } else {
    const categorized = categorizePlayers(players);

    const {GKP, DEF, MID, FWD} = categorized;

    const emptyPlayerAmounts = {
      GKP: 2 - GKP.length,
      DEF: 5 - DEF.length,
      MID: 5 - MID.length,
      FWD: 3 - FWD.length,
    };

    if (Object.values(emptyPlayerAmounts).some(v => v < 0)) {
      Object.entries(emptyPlayerAmounts).forEach(([type, amount]) => {
        if (amount < 0) {
          emptyPlayerAmounts[type] = 0;
        }
      });
    }

    categorizedPlayers = {
      Goalkeepers: GKP.concat(Array(emptyPlayerAmounts.GKP).fill(null)),
      Defenders: DEF.concat(Array(emptyPlayerAmounts.DEF).fill(null)),
      Midfielders: MID.concat(Array(emptyPlayerAmounts.MID).fill(null)),
      Forwards: FWD.concat(Array(emptyPlayerAmounts.FWD).fill(null)),
    };
  }


  return (
    <View style={{paddingHorizontal: 15}}>
      {Object.entries(categorizedPlayers).map(([name, items]) => (
        <React.Fragment key={`team-list-${name}`}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
            {name}
          </Text>

          {items.map((p, idx) => (
            <PlayerItem
              onPlayerPress={onPlayerPress}
              player={p}
              key={`team-list-${name}-${p ? p.player_stats.id : idx}`}
            />
          ))}
        </React.Fragment>
      ))}
    </View>
  );
};

export default PlayerList;