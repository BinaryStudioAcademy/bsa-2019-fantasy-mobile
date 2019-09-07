import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';

import {Button, Input, Text} from 'react-native-elements';
import {login} from '../containers/Auth/action';
import {primaryColor} from '../styles/common';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({email, password}));
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <View>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={() => setEmail(email)}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button
          buttonStyle={{marginTop: 20, backgroundColor: primaryColor}}
          title="SIGN IN"
          onPress={e => handleLogin(e)}
        />
      </View>
      <Text style={{alignSelf: 'center', color: 'gray', marginTop: 40}}>
        BSA 2019 Fantasy Football | v0.0.1
      </Text>
    </View>
  );
};

export default Login;
