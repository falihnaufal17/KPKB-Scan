import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { View, StyleSheet, Text } from 'react-native'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={64} />
      <Text style={styles.label}>Mohon tunggu sedang memuat data</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginTop: 16
  }
})

export default Loading