import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import SignIn from './SignIn';
import Scanner from './Scanner';
import OpnameForm from './OpnameForm';
import {useAppSelector} from '../store';

const Stack = createNativeStackNavigator();

const Screen = () => {
  const selector = useAppSelector(state => state.auth);

  if (!selector.userToken) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Barcode"
          component={Scanner}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="OpnameForm"
          component={OpnameForm}
          options={{
            animation: 'slide_from_bottom',
            headerShown: true,
            headerTitle: 'Opname Stok',
          }}
        />
      </Stack.Navigator>
    );
  }
};

export default Screen;
