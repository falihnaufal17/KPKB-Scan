import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, MD3Colors} from 'react-native-paper';
import {primary} from '../constants/colors';
import ScanBarcodeWhite from '../assets/icons/ScanBarcodeWhite';

interface ScannerProps {
  navigation: {
    navigate: (name: string, params: Record<string, any>) => void;
    push: (name: string) => void;
  };
}

const Scanner: FC<ScannerProps> = ({navigation}) => {
  const onNavigateScanner = () => navigation.push('Barcode');

  return (
    <FAB
      icon={ScanBarcodeWhite}
      style={styles.fab}
      color={MD3Colors.primary100}
      onPress={onNavigateScanner}
    />
  );
};

export default Scanner;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: primary,
  },
});
