import React from 'react';
import moment from 'moment';
import {Text, View, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FixturesItemType} from '../../types/fixtures.types';
import {images} from '../../images/club-logos/index';

type Props = {
  match: FixturesItemType;
  navigation: any;
};
const FixturesItem = ({match, navigation}: Props) => {
  let label = (
    <Text style={{fontSize: 18}}>{moment(match.start).format('HH:mm')}</Text>
  );

  if (match.started) {
    label = (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18}}>{match.hometeam_score}</Text>
        <Text style={{fontSize: 18}}> : </Text>
        <Text style={{fontSize: 18}}>{match.awayteam_score}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        paddingBottom: 10,
      }}>
      <View
        style={{width: '35%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={images[`badge_${match.hometeam.code}_40`]}
          style={{marginBottom: 5}}
        />
        <Text style={{fontSize: 16}}>{match.hometeam.name}</Text>
      </View>
      <View
        style={{
          width: '20%',
          borderColor: 'green',
          padding: 5,
          borderRadius: 10,
          borderStyle: 'solid',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {label}
      </View>
      <View
        style={{width: '35%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={images[`badge_${match.awayteam.code}_40`]}
          style={{marginBottom: 5}}
        />
        <Text style={{fontSize: 16}}>{match.awayteam.name}</Text>
      </View>
      {match.started && (
        <Button
          containerStyle={{alignItems: 'center', justifyContent: 'center'}}
          icon={<Icon name="arrow-right" size={15} color="green" />}
          iconRight
          type="outline"
          onPress={() =>
            navigation.navigate('FixturesDetails', {
              matchId: match.id,
            })
          }
        />
      )}
    </View>
  );
};

export default FixturesItem;
