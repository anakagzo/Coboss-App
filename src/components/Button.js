/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({
  caption,
  background,
  color,
  buttonAction,
  navigation,
  buttonPress,
}) => {
  const styles = StyleSheet.create({
    text: {
        //width: ,
        backgroundColor: background ? background : 'blue',
        color: color ? color : 'white',
        borderRadius: 8,
        fontSize: 14,
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        textAlign: 'center',
    },
  });

  function press() {
    const btnPress = buttonPress;
    btnPress();
  }

  return (
    <TouchableOpacity
      onPress={() =>
        buttonAction ? navigation?.navigate(buttonAction) : press()
      }>
      <Text style={styles.text}>{caption}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
