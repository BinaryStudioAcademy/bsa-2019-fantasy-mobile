import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import {logout} from '../containers/Auth/action';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <Text>Profile page</Text>
      <Button
        buttonStyle={{marginTop: 20, backgroundColor: '#03A9F4'}}
        title="LOG OUT"
        onPress={() => dispatch(logout())}
      />
    </View>
  );
};

export default Profile;
