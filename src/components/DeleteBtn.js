import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

const DeleteBtn = ({btnClick, extraVal}) => {
  const {id} = extraVal ? extraVal : 0;

  const styles = StyleSheet.create({
    container: {
      width: 25,
      height: 25,
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: 'rgb(100,50,150)',
      color: 'red',
      borderRadius: 20,
      marginVertical: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  function handleClick() {
    if (id){
      btnClick(id);
    } else {
      btnClick();
    }
  }

  return (
    <Pressable
      style={styles.eachBox}
      hitSlop={8}
      pressRetentionOffset={1}
      onPress={() => handleClick()}>
      <View style={styles.container}>
        <Text style={styles.icon}>X</Text>
      </View>
    </Pressable>
  );
}

export default React.memo(DeleteBtn);