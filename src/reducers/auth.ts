import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {clearDocumentAsync} from './document';

type AuthPayload = {
  token: string;
  userToken?: string | null;
  name: string;
};

type AuthState = {
  name: string;
  userToken: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  name: '',
  userToken: null,
  loading: true,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    signIn: (state, action: PayloadAction<AuthPayload>) => {
      state.loading = false;
      state.name = action.payload.name;
      state.userToken = action.payload.token;
    },
    restoreToken: (state, action: PayloadAction<Partial<AuthPayload>>) => {
      state.userToken = action.payload.userToken ?? null;
      state.name = action.payload.name ?? '';
      state.loading = false;
    },
    signOut: state => {
      state.loading = true;
      state.name = '';
      state.userToken = null;
    },
  },
});

export const {signIn, updateName, restoreToken, signOut} = auth.actions;

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

export default auth.reducer;
