import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';

import {Card, Button, Input} from 'react-native-elements';
import {login} from '../containers/Auth/action';

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
    <View style={{paddingVertical: 20}}>
      <Card>
        <Input
          placeholder="Email address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button
          buttonStyle={{marginTop: 20, backgroundColor: '#03A9F4'}}
          title="SIGN IN"
          onPress={e => handleLogin(e)}
        />
      </Card>
    </View>
  );
};

export default Login;
