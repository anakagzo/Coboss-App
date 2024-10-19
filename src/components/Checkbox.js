import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

const Checkbox = ({text, action, index}) => {
  const [click, setClick] = useState('white');
  const [textStyle, setTextStyle] = useState('none');

  const styles = StyleSheet.create({
    container: {
      width: 15,
      height: 15,
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: 'rgb(100,50,150)',
      color: 'red',
      borderRadius: 5,
      marginVertical: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      width: 10,
      height: 10,
      backgroundColor: click,
      borderRadius: 5,
    },
    subtitle: {
      marginLeft: 20,
      fontSize: 16,
      textAlign: 'center',
      textDecorationLine: textStyle,
    },
    eachBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  function handleClick() {
    if (click == 'white') {
      setClick('rgb(100,50,150)');
    } else if (click == 'rgb(100,50,150)') {
      setClick('white');
    }

    if (action) {
      action(index);
    }
  }

  return (
    <Pressable
      style={styles.eachBox}
      hitSlop={4}
      pressRetentionOffset={1}
      onPress={() => handleClick()}>
      <View style={styles.container}>
        <View style={styles.innerContainer} />
      </View>
      {text ? <Text style={styles.subtitle}>{text}</Text> : null}
    </Pressable>
  );
}

export default React.memo(Checkbox);
