import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, TextInput, Button, useTheme} from 'react-native-paper'
import useAsyncStorage from '../hooks/useAsyncStorage'

const Bio = ({navigation}) => {
  const theme = useTheme()
  const [fullName, setFullName] = useState('')
  const {store} = useAsyncStorage()
  
  const onSubmit = async () => {
    store('biodata', fullName)
    // navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{textAlign: 'center'}} variant="titleLarge">Selamat Datang di KPKB Scanner</Text>
        <Text style={{textAlign: 'center'}} variant="titleMedium">Silahkan isi nama lengkap terlebih dahulu</Text>
      </View>
      <View>
      <TextInput
        label="Nama Lengkap"
        mode="outlined"
        style={{marginBottom: 16}}
        onChangeText={v => setFullName(v)}
        onSubmitEditing={onSubmit}
      />
      <Button onPress={onSubmit} buttonColor={theme.colors.onPrimaryContainer} mode="contained">Masuk</Button>
      </View>
    </View>
  )
}

export default Bio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16
  },
  
})