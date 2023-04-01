import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Bio from './src/screens/Bio';
import BarcodeScanner from './src/screens/BarcodeScanner';
import useAsyncStorage from './src/hooks/useAsyncStorage';
import { Provider as PaperProvider } from 'react-native-paper';
import useUploadDocument from './src/hooks/useUploadDocument';
import useHandleLoadMore from './src/hooks/useHandleLoadMore';

const Stack = createNativeStackNavigator();

interface UserToken {
  token?: String | null | undefined | object
  type?: String
}

const App = () => {
  const AuthContext = React.createContext();
  const { get } = useAsyncStorage()
  const { loading, sheetData, handleUpload, clearSheetData, handleDownload, loadingDownload, handleUpdateData } = useUploadDocument()
  const { data, handleLoadMore, loadingMore } = useHandleLoadMore(sheetData)

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: UserToken) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: String | null | undefined | object;

      try {
        userToken = await get('biodata') || null
        console.log(userToken)
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: String) => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' })
    }),
    []
  );

  const initialParams = {
    loading,
    sheetData,
    handleUpload,
    clearSheetData,
    handleDownload,
    loadingDownload,
    data,
    handleLoadMore,
    loadingMore,
    handleUpdateData
  }

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            {state.userToken ? (
              <>
                <Stack.Screen name="Home" component={Home} initialParams={initialParams} />
                <Stack.Screen name="Barcode" component={BarcodeScanner} initialParams={initialParams} options={{
                  animation: 'slide_from_right'
                }} />
              </>
            ) : (
              <Stack.Screen name="Bio" component={Bio} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  )
}

export default App