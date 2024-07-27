import React, {useEffect} from 'react';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';
import Screen from './src/screens';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const theme = useTheme();

  useEffect(() => {
    AsyncStorage.getAllKeys((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
