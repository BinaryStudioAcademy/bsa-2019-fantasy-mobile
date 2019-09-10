import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Text as CustomText, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';

import {
  loadGameweeksAction,
  loadGamesAction,
  loadFixtureSubscriptionsAction,
} from './action';
import { RootState } from '../../store/types';
import { FixturesItemType } from '../../types/fixtures.types';
import { GameweekType } from '../../types/gameweek.type';

import Fixtures from '../../components/Fixtures/Fixtures';
import Spinner from '../../components/Spinner';

import { primaryColor } from '../../styles/common';

type Props = {
  gameweeks: GameweekType[];
  loadGameweeksAction: typeof loadGameweeksAction;
  loadGamesAction: typeof loadGamesAction;
  loadFixtureSubscriptionsAction: typeof loadFixtureSubscriptionsAction;
  games?: [FixturesItemType];
  isLoading: boolean;
  navigation: any;
};

const FixturesContainer = ({
  loadGameweeksAction,
  loadGamesAction,
  loadFixtureSubscriptionsAction,
  gameweeks,
  games,
  isLoading,
  navigation,
}: Props) => {
  const [currentGameweek, setCurrentGameweek] = useState<number>(0);
  useEffect(() => {
    loadGameweeksAction();
    loadFixtureSubscriptionsAction();
  }, [loadGameweeksAction, loadFixtureSubscriptionsAction]);

  useEffect(() => {
    if (gameweeks) {
      const gameweek = gameweeks.find((gw) => {
        const now = moment();
        return moment(now).isBefore(gw.end);
      });
      if (gameweek) {
        const gameweekNumber = gameweek.number;
        // setCurrentGameweek(gameweekNumber - 1);
        setCurrentGameweek(0);
      }
    }
  }, [gameweeks]);

  useEffect(() => {
    if (gameweeks) {
      loadGamesAction(currentGameweek + 1);
    }
  }, [currentGameweek, gameweeks, loadGamesAction]);

  return (
    <View>
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
        centerComponent={{
          text: 'Fixtures',
          style: { color: '#fff', fontSize: 20 },
        }}
        backgroundColor={primaryColor}
      />

      <View style={{ padding: 20 }}>
        <CustomText h3>Fixtures Page</CustomText>
        <CustomText h4 h4Style={{ fontSize: 15 }}>
          Welcome to fixtures page
        </CustomText>
      </View>

      <ScrollView>
        {games && gameweeks && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingBottom: 350,
            }}
          >
            <Text style={{ marginVertical: 7, fontSize: 17 }}>
              Gameweek {currentGameweek + 1} -{' '}
              {moment(gameweeks[currentGameweek].start).format('ddd D MMMM YYYY')}
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: currentGameweek === 0 ? 'flex-end' : 'space-between',
                marginBottom: 15,
                width: '100%',
              }}
            >
              {currentGameweek >= 1 && (
                <View style={{ width: '30%', marginLeft: 10 }}>
                  <Button
                    buttonStyle={{ backgroundColor: primaryColor }}
                    title='Prev'
                    onPress={() => setCurrentGameweek(currentGameweek - 1)}
                  />
                </View>
              )}
              {currentGameweek < gameweeks.length - 1 && (
                <View style={{ width: '30%', marginRight: 10, alignSelf: 'flex-end' }}>
                  <Button
                    buttonStyle={{ backgroundColor: primaryColor }}
                    title='Next'
                    onPress={() => setCurrentGameweek(currentGameweek + 1)}
                  />
                </View>
              )}
            </View>
            {!isLoading && <Fixtures navigation={navigation} games={games} />}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.fixtures.gameweeks,
  games: rootState.fixtures.games,
  isLoading: rootState.fixtures.isLoading,
});

const actions = {
  loadGameweeksAction,
  loadGamesAction,
  loadFixtureSubscriptionsAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FixturesContainer);
