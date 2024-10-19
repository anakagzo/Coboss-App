import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import Button from '../../components/Button';
//import app from '../../../firebaseConfig';
//import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const auth = getAuth(app);

  
  function signInUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('user signed in successful!.');
        navigation.navigate('WelcomePage');
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  

  return (
    <SafeAreaView className="container" style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <View style={styles.mainScreen}>
        <Text style={styles.title}>Welcome back!</Text>
        <View className="form" style={styles.form}>
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
        </View>
        <Button
          buttonPress={signInUser}
          caption="Log in"
          background="rgb(100,50,150)"
          color="white"
        />
        <Text style={styles.footer}>
          Not Registered?
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('SignUp')}>
            {' '}
            Sign up!
          </Text>
        </Text>
      </View>
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
    height: Dimensions.get('window').height,
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
});

export default React.memo(SignInScreen);
