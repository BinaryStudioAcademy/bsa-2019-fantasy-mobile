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
  const [bounceValue] = useState(new Animated.Value(1));

  const bounce = (isStop?: boolean) => {
    if (!isStop) {
      bounceValue.setValue(1);
      Animated.timing(bounceValue, {
        toValue: 2,
        duration: 4000,
        easing: Easing.linear,
      }).start(() => bounce(isStop));
    }
  };

  const spin = (isStop?: boolean) => {
    if (!isStop) {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      }).start(() => spin(isStop));
    }
  };

  React.useEffect(() => {
    bounce();
    spin();
    return () => {
      bounce(true);
      spin(true);
    };
  }, []);

  const bounceRange = bounceValue.interpolate({
    inputRange: [1, 1.25, 1.5, 1.75, 2],
    outputRange: [200, 100, 0, 100, 200],
  });

  const spinRange = spinValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
  });

  return (
    <View style={{alignItems: 'center'}}>
      <Animated.Image
        style={{
          width: 80,
          height: 80,
          transform: [{translateY: bounceRange}, {rotate: spinRange}],
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
