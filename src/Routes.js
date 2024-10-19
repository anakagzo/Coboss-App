import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from './screens/auth/Onboarding';


const Stack = createStackNavigator();

const Routes = () => {
  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default React.memo(Routes);
