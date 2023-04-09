import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, MD3Colors } from 'react-native-paper';

const Scanner = ({navigation}) => {
  return (
    <FAB
      icon="barcode-scan"
      style={styles.fab}
      color={MD3Colors.primary100}
      onPress={() => navigation.push('Barcode')}
    />
  )
}

export default Scanner;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: MD3Colors.primary10
  },
})
