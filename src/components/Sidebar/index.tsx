import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DrawerItems} from 'react-navigation';

import {primaryColor} from '../../styles/common';

const Sidebar = (props: any) => {
  const {user} = useSelector((state: any) => state.profile);

  let avatarSrc = 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png';

  if (user && user.image) {
    avatarSrc = user.image.link;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {user && user.name && (
        <ImageBackground
          resizeMode={'cover'}
          style={{flex: 0}}
          source={{uri: avatarSrc}}>
          <View
            style={{
              height: 180,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              padding: 20,
            }}>
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
            </View>
          </View>
        </ImageBackground>
      )}
      <ScrollView>
        <DrawerItems {...props} activeTintColor={primaryColor} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;
