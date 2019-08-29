import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {DrawerItems} from 'react-navigation';

const Sidebar = (props: any) => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

export default Sidebar;
