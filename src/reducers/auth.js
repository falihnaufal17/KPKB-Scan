import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    userToken: null,
    loading: true
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    signIn: (state, action) => {
      state.loading = true
      state.name = action.payload.name
      state.userToken = action.payload.token
    },
    restoreToken: (state, action) => {
      state.userToken = action.payload?.userToken || null
      state.name = action.payload?.name || ''
      state.loading = false
    },
    signOut: (state) => {
      state.loading = true
      state.name = ''
      state.userToken = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { signIn, updateName, restoreToken, signOut } = auth.actions

export const signInAsync = (name) => async (dispatch) => {
  const generatedToken = uuidv4()
  await AsyncStorage.setItem('biodata', JSON.stringify({name: name, userToken: generatedToken }))

  dispatch(signIn({token: generatedToken, name}))
}

export const signOutAsync = () => async (dispatch) => {
  await AsyncStorage.clear()

  dispatch(signOut())
}

export default auth.reducer