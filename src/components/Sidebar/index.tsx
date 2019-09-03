import React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {DrawerItems} from 'react-navigation';
import {Button} from 'react-native-elements';

import {logout} from '../../containers/Auth/action';

import {primaryColor, secondaryColor} from '../../styles/common';

const Sidebar = (props: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.profile);

  let src =
    'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png';
  if (user && user.image_id) {
    src = user.image_id;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        resizeMode={'cover'}
        style={{flex: 0}}
        source={require('../../images/temp-avatar.jpg')}>
        <View
          style={{
            height: 180,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 20,
          }}>
          {user && user.name && (
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'right',
                }}>
                {user.name}
              </Text>
              <Text style={{color: '#fff', textAlign: 'right'}}>
                {user.money}£ | {user.score} points
              </Text>
              <Button
                buttonStyle={{marginTop: 4, backgroundColor: primaryColor}}
                title="Sign Out"
                onPress={() => dispatch(logout())}
              />
            </View>
          )}
        </View>
      </ImageBackground>
      <ScrollView>
        <DrawerItems
          {...props}
          activeTintColor={primaryColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;
