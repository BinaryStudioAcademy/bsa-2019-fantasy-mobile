import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  Animated,
  Easing,
} from 'react-native';

const Spinner = () => {
  const [spinValue] = useState(new Animated.Value(0));

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => spin());
  };

  React.useEffect(() => {
    spin();
  }, []);

  const spin1 = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{alignItems: 'center'}}>
      <Animated.Image
        style={{
          width: 100,
          height: 100,
          transform: [{rotate: spin1}],
        }}
        source={require('../../images/ball.png')}
      />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: 4,
    height: 180,
    margin: 0,
    marginHorizontal: 'auto',
    left: 0,
    right: 0,
    top: 500,
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: 10,
    backgroundColor: 'grey',
    bottom: 0,
    borderRadius: 100,
    scaleX: 0.8,
    opacity: 0.6,
  },
  gravity: {
    width: 4,
    height: 4,
  },
  ball: {
    width: 4,
    height: 4,
  },
});
