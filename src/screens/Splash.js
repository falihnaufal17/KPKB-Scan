import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {restoreToken} from '../reducers/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const biodata = JSON.parse(await AsyncStorage.getItem('biodata'));

        dispatch(restoreToken(biodata));
      } catch (e) {
        ToastAndroid.show(e, ToastAndroid.SHORT);
      }
    };

    bootstrapAsync();
  }, [dispatch]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator style={{marginBottom: 16}} size="large" />
      <Text style={{textAlign: 'center'}}>Memeriksa token...</Text>
    </View>
  );
};

export default Splash;
