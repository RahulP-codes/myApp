import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

interface IButtonProps {
  title: string;
  isDisabled?: boolean;
  onPress?: any;
  color?: string; // Add this line to allow color prop
}

export const ButtonBox = (props: IButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        buttonColor={props.isDisabled ? '#A68F00' : '#FFE600'}
        onPress={!props.isDisabled && props.onPress}>
        <Text style={[styles.buttonText, {color: props.isDisabled ? 'rgba(0, 0, 0, 0.6)': '#000'}]}>{props.title}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'ProximaBold',
    fontSize: 17,
    lineHeight: 21,
    color: '#000',
    textTransform: 'uppercase',
  },
});
