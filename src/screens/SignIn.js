import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import { signInAsync, updateName } from '../reducers/auth'

const SignIn = () => {
  const theme = useTheme()
  const {name}  = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'center' }} variant="titleLarge">Selamat Datang di KPKB Scanner</Text>
        <Text style={{ textAlign: 'center' }} variant="titleMedium">Silahkan isi nama lengkap terlebih dahulu</Text>
      </View>
      <View>
        <TextInput
          label="Nama Lengkap"
          mode="outlined"
          style={{ marginBottom: 16 }}
          onChangeText={v => dispatch(updateName(v))}
          onSubmitEditing={() => dispatch(signInAsync(name))}
          keyboardType="default"
          textContentType="name"
          value={name}
        />
        <Button disabled={name.length <= 3} onPress={() => dispatch(signInAsync(name))} buttonColor={theme.colors.onPrimaryContainer} mode="contained">Masuk</Button>
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16
  },

})