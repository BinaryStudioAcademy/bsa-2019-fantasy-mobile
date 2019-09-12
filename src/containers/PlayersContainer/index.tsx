import { Card, Button, Header } from 'react-native-elements';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { withNavigation } from 'react-navigation';

import { fetchPlayers } from './actions';
import { usePlayers } from './use-players.hook';
import { PlayerType } from 'src/types/player.types';
import HighlightedPlayer from './components/HighlightedPlayer';

import Players from './components/Players';
import Spinner from 'src/components/Spinner';

import { primaryColor } from 'src/styles/common';
import * as S from './styles';

const PlayersContainer = withNavigation<{}>(({ navigation }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  const {
    players,
    loading,
    playerOfTheWeek,
    pagination,
    nextPage,
    prevPage,
    sorting,
    changeSorting,
  } = usePlayers();

  const [highlightedPlayer, setHighlightedPlayer] = useState<PlayerType | null>(null);

  useEffect(() => {
    if (playerOfTheWeek) {
      setHighlightedPlayer(playerOfTheWeek);
    }
  }, [playerOfTheWeek]);

  const scrollToTop = () => {
    if (scrollRef.current && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const highlightPlayer = (p: PlayerType) => {
    setHighlightedPlayer(p);
    scrollToTop();
  };

  const renderButtons = useCallback(
    () => (
      <View style={S.plain.buttons}>
        <Button
          onPress={() => (prevPage(), scrollToTop())}
          icon={<Icon name='chevron-left' size={20} />}
          buttonStyle={{ ...S.plain.switcher, left: 0 }}
          disabled={pagination.current === 1}
          disabledStyle={{ opacity: 0.1 }}
        />

        <Text>
          {pagination.current} / {pagination.amount}
        </Text>

        <Button
          onPress={() => (nextPage(), scrollToTop())}
          icon={<Icon name='chevron-right' size={20} />}
          buttonStyle={{ ...S.plain.switcher, right: 0 }}
          disabled={pagination.current === pagination.amount}
          disabledStyle={{ opacity: 0.1 }}
        />
      </View>
    ),
    [nextPage, pagination, prevPage],
  );

  return (
    <>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          // @ts-ignore: Unreachable code error
          underlayColor: 'rgba(0, 0, 0, 0.2)',
          onPress: () => navigation.openDrawer(),
        }}
        centerComponent={{ text: 'Players', style: { color: '#fff', fontSize: 20 } }}
        backgroundColor={primaryColor}
      />
      <ScrollView ref={scrollRef}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 30 }} />
        ) : (
          <>
            {playerOfTheWeek && highlightedPlayer && (
              <HighlightedPlayer
                item={highlightedPlayer}
                isPlayerOfTheWeek={highlightedPlayer.id === playerOfTheWeek.id}
              />
            )}

            <Card containerStyle={{ ...S.plain.card, marginBottom: 20 }}>
              {renderButtons()}

              <View>
                <Players
                  players={players}
                  highlightedPlayer={highlightedPlayer}
                  sorting={sorting}
                  changeSorting={changeSorting}
                  onPlayerPress={highlightPlayer}
                />
              </View>

              {renderButtons()}
            </Card>
          </>
        )}
      </ScrollView>
    </>
  );
});

export default PlayersContainer;
