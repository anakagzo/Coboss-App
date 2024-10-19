import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({}) => {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'rgb(6,20,61)',
      width: Dimensions.get('window').width,
      padding: 8,
      textAlign: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    title: {
      flex: 1,
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
    toggleIcon: {
      color: 'white',
      backgroundColor: 'white',
      height: 20,
      width: 20,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={10}
        pressRetentionOffset={2}
        onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('../../assets/icons/menu.png')}
          style={styles.toggleIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Coboss</Text>
    </View>
  );
};

export default React.memo(Header);
