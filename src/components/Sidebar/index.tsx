import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { DrawerItems } from 'react-navigation';

import { primaryColor } from '../../styles/common';
import { generateImageSrc } from '../../helpers/avatar';

const Sidebar = (props: any) => {
  const { user } = useSelector((state: any) => state.profile);
  const [initialImageId, initialImageLink] =
    user && user.image ? [user.image.id, user.image.link] : ['', ''];

  const [imageId, setImageId] = useState<string>(initialImageId);
  const [imageLink, setImageLink] = useState<string>(initialImageLink);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user && (
        <ImageBackground
          resizeMode={'cover'}
          style={{ flex: 0 }}
          source={{
            uri: generateImageSrc(user, imageLink),
          }}
        >
          <View
            style={{
              height: 180,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              padding: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'right',
                }}
              >
                {user.name}
              </Text>
              <Text style={{ color: '#fff', textAlign: 'right' }}>
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
