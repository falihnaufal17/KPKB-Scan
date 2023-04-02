import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import SignIn from './SignIn';
import BarcodeScanner from './BarcodeScanner';
import useUploadDocument from '../hooks/useUploadDocument';
import useHandleLoadMore from '../hooks/useHandleLoadMore';
import Splash from './Splash';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Screen = () => {
  const { loading, sheetData, handleUpload, clearSheetData, handleDownload, loadingDownload, handleUpdateData } = useUploadDocument()
  const { data, handleLoadMore, loadingMore } = useHandleLoadMore(sheetData)
  const selector = useSelector(state => state.auth)
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
            <Stack.Screen name="Home" component={Home} initialParams={initialParams} />
            <Stack.Screen name="Barcode" component={BarcodeScanner} initialParams={initialParams} options={{
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