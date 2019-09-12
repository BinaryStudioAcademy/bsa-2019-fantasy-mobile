import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Text as CustomText, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';

import { RootState } from '../../store/types';
import {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  setCurrentGameweekAction,
} from './actions';
import { loadUserLeagues } from '../LeaguesContainer/actions';

import Leagues from './components/Leagues';
import HomePlayerList from './components/HomePlayerList';
import Spinner from '../../components/Spinner';

import { primaryColor } from '../../styles/common';

const HomeContainer = ({
  gameweeks,
  gameweeksHistory,
  teamHistory,
  leagues,
  isLoading,
  currentGameweek,
  navigation,
}) => {
  const dispatch = useDispatch();

  const { id, name } = useSelector((state: RootState) => state.profile.user);

  useEffect(() => {
    if (id) {
      dispatch(loadUserLeagues(id));
      dispatch(loadGameweeksHistoryAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      const idx = gameweeksHistory.findIndex((gw) => {
        return gw.gameweek.number === currentGameweek;
      });
      if (idx !== -1) {
        const gameweekId = gameweeksHistory[idx].gameweek.id;
        dispatch(loadTeamHistoryAction(id, gameweekId, currentGameweek));
      }
    }
  }, [currentGameweek, gameweeksHistory.length]);

  if (!gameweeksHistory && !leagues && !teamHistory) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  const horizontalMargin = 0;
  const slideWidth = 260;

  const sliderWidth = Dimensions.get('window').width - 40;
  const itemWidth = slideWidth - horizontalMargin * 2;
  const itemHeight = 200;

  const renderGameeweekItem = ({ item, index, navigation }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
          backgroundColor: primaryColor,
          paddingVertical: 25,
          borderRadius: 10,
        }}
      >
        <Icon name='ios-football' size={45} color='#9CB4B4' style={{ marginRight: 10 }} />
        <View>
          <CustomText h3 h3Style={{ color: 'white' }}>{`Gameweek ${index +
            1}`}</CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {index - 1 >= 0 && (
              <Text style={styles.pagination}>
                <Icon name='md-arrow-dropleft' size={12} color='#DDD' /> Previous
              </Text>
            )}
            {index + 2 <= gameweeksHistory.length && (
              <Text style={styles.pagination}>
                Next <Icon name='md-arrow-dropright' size={12} color='#DDD' />
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: '#efefef' }}>
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
        centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 20 } }}
        backgroundColor={primaryColor}
      />
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <CustomText
            h3
            h3Style={{ color: '#272727' }}
          >{`Welcome back, ${name}!`}</CustomText>
          <CustomText h4 h4Style={{ fontSize: 16, color: '#272727' }}>
            Explore your gameweek statistics
          </CustomText>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingVertical: 15,
            marginBottom: 50,
          }}
        >
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={gameweeksHistory}
            renderItem={renderGameeweekItem}
            inactiveSlideScale={0.95}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onBeforeSnapToItem={(slideIndex) =>
              dispatch(setCurrentGameweekAction(slideIndex + 1))
            }
          />
          {isLoading || !teamHistory.length ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator />
            </View>
          ) : teamHistory.length ? (
            <HomePlayerList players={teamHistory} />
          ) : (
            <Text style={{ flex: 1, textAlign: 'center' }}>Nothing to show</Text>
          )}
          <Leagues data={leagues} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    color: '#DDD',
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 10,
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
