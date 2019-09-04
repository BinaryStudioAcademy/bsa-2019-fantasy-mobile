import React from 'react';
import {View, Text} from 'react-native';
import {Header, Button} from 'react-native-elements';
import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';

import { useDispatch } from 'react-redux';
import { logout } from '../Auth/action';

import {primaryColor, primaryDarkColor} from '../../styles/common';

const Profile = (props: any) => {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <GeneralStatusBarColor
        backgroundColor={primaryDarkColor}
        barStyle="light-content"
      />
      <Header
        containerStyle={{height: 60, paddingTop: 0}}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'Profile',
          style: {color: '#fff', fontSize: 20},
        }}
        backgroundColor={primaryColor}
      />
      <View style={{padding: 20}}>
        <Button
          buttonStyle={{marginTop: 4, backgroundColor: primaryColor}}
          title="Sign Out"
          onPress={() => dispatch(logout())}
        />
      </View>
    </View>
  );
};

export default Profile;
