import React, { useState } from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { FixturesItemType } from '../../types/fixtures.types';
import {
  createFixtureSubscription,
  deleteFixtureSubscription,
} from '../../containers/Auth/action';
import { images } from '../../images/club-logos/index';
import { primaryColor } from '../../styles/common';

type Props = {
  match: FixturesItemType;
  subscribed: boolean;
  navigation: any;
};
const FixturesItem = ({ match, navigation, subscribed }: Props) => {
  const [isSubscribed, setSubscribe] = useState<boolean>(subscribed);
  const dispatch = useDispatch();
  let label = <Text style={{ fontSize: 16 }}>{moment(match.start).format('HH:mm')}</Text>;

  if (match.started) {
    label = (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18 }}>{match.hometeam_score}</Text>
        <Text style={{ fontSize: 18 }}> : </Text>
        <Text style={{ fontSize: 18 }}>{match.awayteam_score}</Text>
      </View>
    );
  }

  const onSubscribe = () => {
    if (isSubscribed) {
      showMessage({
        icon: 'success',
        message: `${'You have unsubscribed from fixture'} ${match.hometeam.name} - ${
          match.awayteam.name
        }, ${'which starts on'} ${moment(match.start).format('dddd D MMMM YYYY HH:mm')} `,
        type: 'success',
      });
      dispatch(deleteFixtureSubscription(match.id));
    } else {
      showMessage({
        icon: 'success',
        message: `${'You have subscribed from fixture'} ${match.hometeam.name} - ${
          match.awayteam.name
        }, ${'which starts on'} ${moment(match.start).format('dddd D MMMM YYYY HH:mm')} `,
        type: 'success',
      });
      dispatch(createFixtureSubscription(match.id));
    }
    setSubscribe(!isSubscribed);
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingBottom: 10,
      }}
      onPress={() => {
        if (match.started) {
          navigation.navigate('FixturesDetails', {
            match,
          });
        }
      }}
    >
      <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={images[`badge_${match.hometeam.code}_40`]}
          style={{ marginBottom: 5 }}
        />
        <Text style={{ fontSize: 16 }}>{match.hometeam.name}</Text>
      </View>
      <View
        style={{
          width: '20%',
          borderColor: primaryColor,
          padding: 5,
          borderRadius: 10,
          borderStyle: 'solid',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {label}
      </View>
      <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={images[`badge_${match.awayteam.code}_40`]}
          style={{ marginBottom: 5 }}
        />
        <Text style={{ fontSize: 16 }}>{match.awayteam.name}</Text>
      </View>
      {match.started ? null : (
        <Button
          type='outline'
          buttonStyle={{
            borderColor: primaryColor,
            position: 'absolute',
            top: 23,
            right: -20,
          }}
          icon={
            <Icon
              name={isSubscribed ? 'bell' : 'bell-o'}
              size={15}
              color={primaryColor}
            />
          }
          onPress={() => onSubscribe()}
        />
      )}
    </TouchableOpacity>
  );
};

export default FixturesItem;
