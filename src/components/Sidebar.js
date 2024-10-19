import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Text, StyleSheet, Linking} from 'react-native';

export default function SideBar(props) {
  const {navigation} = props;


  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
        Home
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Tasks')}>
        Tasks
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://google.com')}>
        Privacy Policy
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://google.com')}>
        Terms and Conditions
      </Text>
      <Text style={styles.link} onPress={logout}>
        Log out
      </Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
    margin: 8,
    marginHorizontal: 16,
  },
});
