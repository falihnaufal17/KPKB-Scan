import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, MD3Colors } from 'react-native-paper'

const ListHeader = ({onClear, onDownload}) => {
  return (
    <View style={styles.container}>
      <Button buttonColor={MD3Colors.error50} icon="trash-can-outline" mode="contained" onPress={onClear}>
        Bersihkan
      </Button>
      <Button buttonColor={MD3Colors.tertiary50} icon="download" mode="contained" onPress={onDownload}>
        Unduh
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16
  }
})

export default memo(ListHeader, (prevState, nextState) => JSON.stringify(prevState) === JSON.stringify(nextState))