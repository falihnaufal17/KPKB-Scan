import React from 'react';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';
import Screen from './src/screens';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const theme = useTheme();

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
