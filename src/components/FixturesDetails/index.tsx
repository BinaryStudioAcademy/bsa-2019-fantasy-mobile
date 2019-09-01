import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Text as CustomText} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

// import MatchStats from '../MatchStats';
// import {FixturesItemType} from '../../types/fixtures.types';
// import {RootState} from '../../store/types';

// type Props = {
//   match: FixturesItemType;
//   currentMatchStats: FixturesItemType | undefined;
//   setCurrentMatchStats: React.Dispatch<
//     React.SetStateAction<FixturesItemType | undefined>
//   >;
// };
// const names = {
//   attack: 'Attack',
//   shot: 'Shots',
//   foul: 'Fouls',
//   goal: 'Goals',
//   save: 'Saves',
//   miss: 'Misses',
//   yellowCard: 'Yellow Cards',
//   goalKick: 'Goal kicks',
//   cornerKick: 'Corner kicks',
//   freeKick: 'Free kicks',
//   penaltyKick: 'Penalty kick',
//   interception: 'Interceptions',
//   out: 'Outs',
//   trauma: 'Traumas',
//   redCard: 'Red cards',
//   nothing: 'Nothing',
// };

// const FixtureDetails = ({currentMatchStats, match}: Props) => {
//   const [stats, setStats] = useState<any>([]);
//   const gameDetails = useSelector(
//     (state: RootState) => state.fixtures.gameDetails,
//   );
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (gameDetails) {
//       gameDetails.forEach(g => {
//         if (!g.player) return;
//         setStats(stats => {
//           let team;
//           if (g.player) {
//             team =
//               g.player.player.club_id === match.hometeam_id
//                 ? 'hometeam_stats'
//                 : 'awayteam_stats';
//           } else {
//             team = 'common_stats';
//           }

//           const statsItem = stats.find(st => st.title === names[g.event_type]);
//           if (statsItem) {
//             const index = statsItem[team].findIndex(
//               item => item.player === g.player.player.second_name,
//             );
//             if (index !== -1) {
//               statsItem[team][index].count = statsItem[team][index].count + 1;
//             } else {
//               statsItem[team].push({
//                 player: g.player.player.second_name,
//                 count: 1,
//               });
//             }
//             const statsItemIndex = stats.findIndex(
//               st => st.title === names[g.event_type],
//             );
//             return [
//               ...stats.slice(0, statsItemIndex),
//               statsItem,
//               ...stats.slice(statsItemIndex + 1),
//             ];
//           } else {
//             return [
//               ...stats,
//               {
//                 title: names[g.event_type],
//                 hometeam_stats: [],
//                 awayteam_stats: [],
//                 [team]: [
//                   {
//                     player: g.player.player.second_name,
//                     count: 1,
//                   },
//                 ],
//               },
//             ];
//           }
//         });
//       });
//     }
//   }, [gameDetails]);

//   const toggleStats = () => {
//     setStats([]);
//     if (match.started) {
//       if (!isDisplay) {
//         setCurrentMatchStats(match);
//         dispatch(loadGameDetailsAction(match.id));
//       }

//     }
//   };

//   const displayStats = () =>
//     stats
//       .sort((a, b) => {
//         if (a.title > b.title) {
//           return 1;
//         }
//         if (a.title < b.title) {
//           return -1;
//         }
//         return 0;
//       })
//       .map(({title, awayteam_stats, hometeam_stats}) => (
//         <MatchStats
//           title={title}
//           awayteam_stats={awayteam_stats}
//           hometeam_stats={hometeam_stats}
//           key={`stats-${title}-${match.id}`}
//         />
//       ));

//   const displayStats = () =>
//     stats
//       .sort((a, b) => {
//         if (a.title > b.title) {
//           return 1;
//         }
//         if (a.title < b.title) {
//           return -1;
//         }
//         return 0;
//       })
//       .map(({title, awayteam_stats, hometeam_stats}) => (
//         <MatchStats
//           title={title}
//           awayteam_stats={awayteam_stats}
//           hometeam_stats={hometeam_stats}
//           key={`stats-${title}-${match.id}`}
//         />
//       ));

//   let label = <p>{moment(match.start).format('HH:mm')}</p>;

//   if (match.started) {
//     label = (
//       <div className="flex">
//         <p
//           className={cn(
//             styles['home-score'],
//             'score',
//             'text-white',
//             'font-bold',
//             'bg-green-900',
//           )}>
//           {match.hometeam_score}
//         </p>
//         <p
//           className={cn(
//             styles['away-score'],
//             'score',
//             'text-white',
//             'font-bold',
//             'bg-green-900',
//           )}>
//           {match.awayteam_score}
//         </p>
//       </div>
//     );
//   }

//   return <View>{displayStats()}</View>;
// };

// export default FixtureDetails;

const FixtureDetails = ({navigation}: any) => {
  const matchId = navigation.getParam('matchId', 'NO-ID');
  return <Text>{matchId}</Text>;
};

export default FixtureDetails;
