import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Dimensions } from 'react-native';
import { Header, Button, Image, Text as CustomText } from 'react-native-elements';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Auth/action';

import { RootState } from '../../store/types';
import { generateImageSrc } from '../../helpers/avatar';
import { updateUser } from './actions';

import { primaryColor, primaryDarkColor } from '../../styles/common';

const windowWidth = Dimensions.get('window').width;

const Profile = (props: any) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.profile.user);

  const [initialUsername, initialEmail] = user ? [user.name, user.email] : ['', ''];
  const [intialImageId, initialImageLink] =
    user && user.image ? [user.image.id, user.image.link] : ['', ''];

  const [imageId, setImageId] = useState<string>(intialImageId);
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

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#efefef' }}>
      <Header
        containerStyle={{ height: 60, paddingTop: 0 }}
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
          onPress: () => props.navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'Profile',
          style: { color: '#fff', fontSize: 20 },
        }}
        backgroundColor={primaryColor}
      />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View>
            <Image
              source={{ uri: generateImageSrc(user, imageLink) }}
              style={{ width: windowWidth, height: 300 }}
              PlaceholderContent={<ActivityIndicator />}
            />

            <CustomText h4 style={{ textAlign: 'center', marginVertical: 15 }}>
              {initialUsername}
            </CustomText>
          </View>
          <View style={{ padding: 20 }}>
            <Button
              buttonStyle={{ marginTop: 4, backgroundColor: primaryColor }}
              title='Sign Out'
              onPress={() => dispatch(logout())}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;