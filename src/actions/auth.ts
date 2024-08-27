import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import {setToken, signIn, signOut} from '../reducers/auth';
import {AuthPayload} from '../types/auth';
import {clearDocumentAsync} from './product';

export const signInAsync = (name: string) => async (dispatch: any) => {
  const generatedToken = uuidv4();
  await AsyncStorage.setItem(
    'biodata',
    JSON.stringify({name, userToken: generatedToken}),
  );

  dispatch(signIn({token: generatedToken, name}));
};

export const signOutAsync = () => async (dispatch: any) => {
  await AsyncStorage.clear();

  dispatch(signOut());
  dispatch(clearDocumentAsync({message: 'Data berhasil dibersihkan'}));
};

export const restoreToken = (auth: AuthPayload) => (dispatch: any) => {
  dispatch(setToken(auth));
};
