import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Text as CustomText, Button, Header, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';

import {RootState} from '../../store/types';
import {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  setCurrentGameweekAction,
} from './actions';
import {loadUserLeagues} from '../LeaguesContainer/actions';

import Leagues from './components/Leagues';
import PlayerList from './components/PlayerList';
import Spinner from '../../components/Spinner';

const HomeContainer = ({
  gameweeks,
  gameweeksHistory,
  teamHistory,
  leagues,
  isLoading,
  currentGameweek,
  navigation
}) => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  useEffect(() => {
    if (userId) {
      dispatch(loadUserLeagues(userId));
      dispatch(loadGameweeksHistoryAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      const idx = gameweeksHistory.findIndex(gw => {
        return gw.gameweek.number === currentGameweek;
      });
      if (idx !== -1) {
        const gameweekId = gameweeksHistory[idx].gameweek.id;
        dispatch(loadTeamHistoryAction(userId, gameweekId, currentGameweek));
      }
    }
  }, [currentGameweek, gameweeksHistory.length]);
  console.log(currentGameweek, teamHistory);

  if (!gameweeksHistory && !leagues && !teamHistory.length) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const horizontalMargin = 0;
  const slideWidth = 280;

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = slideWidth - horizontalMargin * 2;
  const itemHeight = 200;

  const renderGameeweekItem = ({item, index}) => {
    return (
      <Card style={{padding: 0, borderRadius: 5, marginHorizontal: 0}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
            marginHorizontal: 0,
          }}>
          <CustomText h3>{`Gameweek ${index + 1}`}</CustomText>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {index - 1 >= 0 && (
              <Text style={styles.pagination}>
                <Icon name="caretleft" size={11} color="#999" /> Previous
              </Text>
            )}
            {index + 2 <= gameweeksHistory.length && (
              <Text style={styles.pagination}>
                Next <Icon name="caretright" size={11} color="#999" />
              </Text>
            )}
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{backgroundColor: '#e6e6e6'}}>
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => navigation.openDrawer(),
        }}
        centerComponent={{text: 'Home', style: {color: '#fff', fontSize: 20}}}
        backgroundColor={'#122737'}
      />
      <ScrollView>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={gameweeksHistory}
          renderItem={renderGameeweekItem}
          inactiveSlideScale={1}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onBeforeSnapToItem={slideIndex =>
            dispatch(setCurrentGameweekAction(slideIndex + 1))
          }
        />
        {isLoading ? (
          <View style={{marginTop: 10}}>
            <ActivityIndicator />
          </View>
        ) : (
          <PlayerList players={teamHistory} />
        )}
        <Leagues data={leagues} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    color: '#999',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.gameweeks.gameweeks,
  gameweeksHistory: rootState.gameweekHistory.gameweeksHistory,
  currentGameweek: rootState.gameweekHistory.currentGameweek,
  teamHistory: rootState.gameweekHistory.teamHistory,
  isLoading: rootState.gameweekHistory.isLoading,
  leagues: rootState.league.leagues,
});

const actions = {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  loadUserLeagues,
  setCurrentGameweekAction,
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);