import React, {FC} from 'react';
import {MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';
import Screen from './src/screens';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={MD3LightTheme}>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
