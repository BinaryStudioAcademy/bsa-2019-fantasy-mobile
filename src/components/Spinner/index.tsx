import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.box}>
      <View style={styles.shadow} />
      <View style={styles.gravity}>
        <ImageBackground
          source={{uri: 'https://image.flaticon.com/icons/svg/33/33736.svg'}}
          style={styles.ball}
        />
      </View>
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
