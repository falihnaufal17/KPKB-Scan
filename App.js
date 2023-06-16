import { Provider as PaperProvider } from 'react-native-paper';
import Screen from './src/screens';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

export default App