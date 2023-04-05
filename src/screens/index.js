import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import SignIn from './SignIn';
import BarcodeScanner from './BarcodeScanner';
import Splash from './Splash';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Screen = () => {
  const selector = useSelector(state => state.auth)

  if (selector.loading) {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {selector.userToken ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Barcode" component={BarcodeScanner} options={{
              animation: 'slide_from_right'
            }} />
          </>
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
      </Stack.Navigator>
    )

  }
}

export default Screen