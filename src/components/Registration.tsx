import React from 'react';
import {View} from 'react-native';

import {Card, Button, Input} from 'react-native-elements';

const Registration = ({navigation}: any) => (
  <View style={{paddingVertical: 20}}>
    <Card>
      <Input
        placeholder="Name..."
    
      />
      <Input
        placeholder="Email address..."

      />
      <Input
        secureTextEntry
        placeholder="Password..."

      />

      <Button
        buttonStyle={{marginTop: 20, backgroundColor: '#03A9F4'}}
        title="SIGN UP"
        onPress={() => {
          console.log('hello');
        }}
      />
    </Card>
  </View>
);

export default Registration;
