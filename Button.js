import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CommonButton = ({text = 'DONE', onPress = () => {}, disable = false}) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={styles.touch}>
      <Text style={styles.payText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    height: 40,
    marginHorizontal: 20,
    backgroundColor: disable ? 'grey' : '#D76540',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  payText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default CommonButton;
