import React from 'react';
import {Text, View, Image, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {DrawerItems} from 'react-navigation';

const Sidebar = (props: any) => {
  const {user} = useSelector((state: any) => state.profile);
  let src =
    'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png';
  if (user && user.image_id) {
    src = user.image_id;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: 180,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
          marginBottom: 30,
        }}>
        <Image
          source={{uri: src}}
          style={{height: 100, width: 100, borderRadius: 60}}
        />
        {user && user.name && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 23, marginTop: 7, marginBottom: 3}}>
              {user.name}
            </Text>
            <Text style={{fontSize: 16}}>Money: {user.money}</Text>
            <Text style={{fontSize: 16}}>Score: {user.score}</Text>
          </View>
        )}
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;
