import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import { Header, Button, Image, Text as CustomText, Input } from 'react-native-elements';
import validator from 'validator';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../Auth/action';

import { RootState } from '../../store/types';
import { generateImageSrc } from '../../helpers/avatar';

import { primaryColor } from '../../styles/common';

const windowWidth = Dimensions.get('window').width - 40;

const Profile = (props: any) => {
  const dispatch = useDispatch();

  const { user, updatingUser } = useSelector((state: RootState) => state.profile);

  const [initialUsername, initialEmail] = user ? [user.name, user.email] : ['', ''];
  const [initialImageId, initialImageLink] =
    user && user.image ? [user.image.id, user.image.link] : ['', ''];

  const [imageId, setImageId] = useState<string>(initialImageId);
  const [imageLink, setImageLink] = useState<string>(initialImageLink);
  const [username, setUsername] = useState<string>(initialUsername);
  const [email, setEmail] = useState<string>(initialEmail);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [toChangePassword, setToChangePassword] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (
      user &&
      (username !== user.name ||
        email !== user.email ||
        (!user.image && imageId) ||
        (user.image && imageId !== user.image.id))
    ) {
      setCanSubmit(true);
    }
  }, [username, email, imageId]);

  if (!user)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );

  const usernameChanged = (name: string) => {
    setUsername(name);
    setIsUsernameValid(true);
  };

  const emailChanged = (email: string) => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const validateUsername = () => {
    const isNameValid = validator.isByteLength(username, { min: 5, max: undefined });
    setIsUsernameValid(isNameValid);
    return isNameValid;
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const valid = [validateEmail(), validateUsername()].every(Boolean);

    if (!valid) {
      return;
    }

    dispatch(updateUser(imageId, username, email));
  };

  const { money, score } = user;
  console.log(updatingUser);

  return (
    <View style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          // @ts-ignore: Unreachable code error
          underlayColor: 'rgba(0, 0, 0, 0.2)',
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'Profile',
          style: { color: '#fff', fontSize: 20 },
        }}
        backgroundColor={primaryColor}
      />
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: generateImageSrc(user, imageLink) }}
              style={{
                width: windowWidth,
                height: 300,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />

            <CustomText h3 style={{ textAlign: 'center', marginVertical: 15 }}>
              {initialUsername}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={styles.icon}>
              <Icon name='coin' color='#666' size={20} />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#666',
                fontSize: 20,
              }}
            >
              £{money}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={styles.icon}>
              <Icon name='star-four-points-outline' color='#666' size={20} />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#666',
                fontSize: 20,
              }}
            >
              {score} points
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <CustomText h4 h4Style={{ marginBottom: 15 }}>
            Your Personal Details
          </CustomText>
          <Input
            label='Username'
            placeholder='Username'
            value={username}
            onChangeText={(text) => setUsername(text)}
            onBlur={validateUsername}
            containerStyle={{ marginBottom: 10 }}
          />
          <Input
            label='Email'
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            onBlur={validateEmail}
          />
          <Button
            buttonStyle={{
              marginTop: 20,
              marginBottom: 10,
              backgroundColor: primaryColor,
            }}
            title='Submit'
            disabled={!canSubmit || !username || !email}
            onPress={onSubmit}
            loading={updatingUser}
          />
        </View>
        <Button
          buttonStyle={{ marginBottom: 40, backgroundColor: primaryColor }}
          title='Sign Out'
          onPress={() => dispatch(logout())}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { marginRight: 3 },
});

export default Profile;