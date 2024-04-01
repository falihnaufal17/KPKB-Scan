import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import SignIn from './SignIn';
import BarcodeScanner from './BarcodeScanner';
import Splash from './Splash';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDataExcel} from '../reducers/document';
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const Screen = () => {
  const selector = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const excelData =
          JSON.parse(await AsyncStorage.getItem('@excelData')) || [];

        if (excelData.length > 0) {
          dispatch(setDataExcel(excelData));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDataFromLocal();
  }, [dispatch]);

  if (selector.loading) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {selector.userToken ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Barcode"
              component={BarcodeScanner}
              options={{
                animation: 'slide_from_right',
              }}
            />
          </>
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
      </Stack.Navigator>
    );
  }
};

export default Screen;
