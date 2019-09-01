import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Text as CustomText, Button, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import MatchStats from '../MatchStats';

import {FixturesItemType, GameDetailsType} from '../../types/fixtures.types';
import {RootState} from '../../store/types';
import {loadGameDetailsAction} from '../../containers/FixturesContainers/action';

type Props = {
  match: FixturesItemType;
  currentMatchStats: FixturesItemType | undefined;
  setCurrentMatchStats: React.Dispatch<
    React.SetStateAction<FixturesItemType | undefined>
  >;
  navigation: any;
};

type TeamStats = {
  player: string;
  count: number;
};

type Stats = {
  title: string;
  hometeam_stats: TeamStats[];
  awayteam_stats: TeamStats[];
};

const names: {[s: string]: string} = {
  attack: 'Attack',
  shot: 'Shots',
  foul: 'Fouls',
  goal: 'Goals',
  save: 'Saves',
  miss: 'Misses',
  yellowCard: 'Yellow Cards',
  goalKick: 'Goal kicks',
  cornerKick: 'Corner kicks',
  freeKick: 'Free kicks',
  penaltyKick: 'Penalty kick',
  interception: 'Interceptions',
  out: 'Outs',
  trauma: 'Traumas',
  redCard: 'Red cards',
  nothing: 'Nothing',
} as const;

const FixtureDetails = ({currentMatchStats, match, navigation}: Props) => {
  const matchId = navigation.getParam('matchId', 'NO-ID');
  const [stats, setStats] = useState<any>([]);
  const gameDetails = useSelector(
    (state: RootState) => state.fixtures.gameDetails,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGameDetailsAction(matchId));
  }, [matchId]);

  useEffect(() => {
    if (gameDetails) {
      gameDetails.forEach((g: GameDetailsType) => {
        if (!g.player) return;
        setStats((stats: Stats[]) => {
          let team: keyof Stats;
          // if (g.player) {
          team =
            g.player.player.club_id === match.hometeam_id
              ? 'hometeam_stats'
              : 'awayteam_stats';
          // }

          const statsItem = stats.find(
            (st: Stats) => st.title === names[g.event_type],
          );
          if (statsItem) {
            const index = statsItem[team].findIndex(
              (item: TeamStats) => item.player === g.player.player.second_name,
            );
            if (index !== -1) {
              statsItem[team][index].count = statsItem[team][index].count + 1;
            } else {
              statsItem[team].push({
                player: g.player.player.second_name,
                count: 1,
              });
            }
            const statsItemIndex = stats.findIndex(
              (st: Stats) => st.title === names[g.event_type],
            );
            return [
              ...stats.slice(0, statsItemIndex),
              statsItem,
              ...stats.slice(statsItemIndex + 1),
            ];
          } else {
            return [
              ...stats,
              {
                title: names[g.event_type],
                hometeam_stats: [],
                awayteam_stats: [],
                [team]: [
                  {
                    player: g.player.player.second_name,
                    count: 1,
                  },
                ],
              },
            ];
          }
        });
      });
    }
  }, [gameDetails]);

  const displayStats = () =>
    stats
      .sort((a: Stats, b: Stats) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
      .map(({title, awayteam_stats, hometeam_stats}: Stats) => (
        <MatchStats
          title={title}
          awayteam_stats={awayteam_stats}
          hometeam_stats={hometeam_stats}
          key={`stats-${title}-${match.id}`}
        />
      ));

  return (
    <View>
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={
          <Icon
            name="caret-left"
            size={30}
            color="#fff"
            onPress={() => navigation.navigate('Fixtures')}
          />
        }
        centerComponent={{
          text: 'Match Details',
          style: {color: '#fff', fontSize: 20},
        }}
        backgroundColor={'#122737'}
      />

      <MatchStats
        title="Goals"
        hometeam_stats={[
          {player: 'anima', count: 3},
          {player: 'sadads', count: 4},
        ]}
        awayteam_stats={[
          {player: 'anisadasdma', count: 5},
          {player: 'sadads', count: 4},
          {player: 'sadadasdasds', count: 4},
        ]}
      />
    </View>
  );
};

export default FixtureDetails;
