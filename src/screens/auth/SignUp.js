/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  TextInput,
  Linking,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
//import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//import { auth } from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const auth = getAuth();

  const onSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert('passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email,password)
      .then(() => {
        console.log('user account created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use'){
          console.log('That email is already in use');
        }

        if (error.code === 'auth/invalid-email'){
          console.log('That email address is invalid');
        }

        console.log(error);
      })
  }
 /*
  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const auth = getAuth();

        updateProfile(auth.currentUser, {
          displayName: fName + ' ' + lName
        }).then(() => {
          // Profile updated!
          console.log('user account created successfully!.');
          navigation.navigate('WelcomePage');
        }).catch((error) => {
          // An error occurred
          console.log(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
  }
  */

  function onLinkPress() {
    Linking.openURL('https://google.com')
  }

  return (
    <SafeAreaView className="container" style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainScreen}>
        <Text style={styles.title}>Join the hub!</Text>
        <View className="form" style={styles.form}>
          <TextInput
            onChangeText={val => setFName(val)}
            placeholder="First Name"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={val => setLName(val)}
            placeholder="Last Name"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={val => setEmail(val)}
            placeholder="Email"
            style={styles.textInput}
            keyboardType="email-address"
          />
          <TextInput
            onChangeText={val => setPassword(val)}
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
          />
          <TextInput
            onChangeText={val => setConfirmPassword(val)}
            placeholder="Confirm Password"
            style={styles.textInput}
            secureTextEntry
          />
        </View>

        <Button
          buttonPress={onSubmit}
          caption="Create new account"
          background="blue"
          color="white"
        />

        <View style={styles.policy}>
          <Checkbox/>  
          <Text style={styles.policyText}>
            I agree to
            <Text style={styles.policyTextLink} onPress={() => onLinkPress()}>
              Terms and Conditions
            </Text>{' '}
            and{' '}
            <Text style={styles.policyTextLink} onPress={() => onLinkPress()}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <Text style={styles.footer}>
          Already Registered?
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('SignIn')}>
            {' '}
            Sign in!
          </Text>
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height ,
    opacity: 0.6,
  },

  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: Dimensions.get('window').height * 0.6,
    bottom: 0,
    alignItems: 'center',
    padding: 10,
  },

  title: {
    marginVertical: 20,
    paddingTop: 20,
    fontSize: 22, 
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 35,
    fontSize: 15, 
    color: 'grey',
    textAlign: 'center',
  },
  textInput: {
    width: 300,
    backgroundColor: 'rgb(220,220,220)',
    color: 'black',
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  form: {
    marginTop: 10,
    marginBottom: 40,
  },
  footer: {
    textAlign: 'center',
    color: 'rgb(100,100,100)',
    marginVertical: 20,
    fontSize: 16,
  },
  footerLink: {
    color: 'rgb(100,50,150)',
    fontWeight: 'bold',
  },
  policyText: {
    textAlign: 'center',
    color: 'rgb(150,150,150)',
    marginVertical: 20,
    marginHorizontal: 4,
    fontSize: 12,
  },
  policyTextLink: {
    textAlign: 'center',
    color: 'rgb(150,150,150)',
    marginVertical: 20,
    marginHorizontal: 2,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  policy: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
 
});

export default React.memo(SignUpScreen);