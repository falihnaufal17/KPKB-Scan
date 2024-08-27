import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import {AuthPayload, AuthState} from '../types/auth';

const initialState: AuthState = {
  name: '',
  userToken: null,
  loading: true,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthPayload>) => {
      state.loading = false;
      state.name = action.payload?.name || '';
      state.userToken = action.payload?.token || '';
    },
    setToken: (state, action: PayloadAction<Partial<AuthPayload>>) => {
      state.userToken = action.payload?.userToken ?? null;
      state.name = action.payload?.name ?? '';
      state.loading = false;
    },
    signOut: state => {
      state.loading = true;
      state.name = '';
      state.userToken = null;
    },
  },
});

export const {signIn, setToken, signOut} = auth.actions;

export default auth.reducer;
