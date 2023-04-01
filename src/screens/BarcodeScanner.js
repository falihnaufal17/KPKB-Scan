import React, { useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import {RNCamera} from 'react-native-camera';
import ModalForm from '../components/ModalForm';

const BarcodeScanner = ({route}) => {
  const [qrData, setQrData] = useState('');
  const [visible, setVisible] = useState(false)
  const {handleUpdateData, sheetData} = route.params
  console.log(handleUpdateData)
  const handleBarCodeScanned = (data) => {
    if (data.data) {
      setQrData(data.data)
      setVisible(true)
    } else {
      ToastAndroid.show('Barcode not found', ToastAndroid.SHORT)
    }
  };

  const onDismiss = () => {
      setQrData('')
      setVisible(false)
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      {qrData ? (
        <Text style={styles.qrData}>{qrData}</Text>
      ) : (
        <Text style={styles.instructions}>Scan a QR code</Text>
      )}
      <ModalForm
        data={sheetData}
        visible={visible}
        barcode={qrData}
        onDismiss={onDismiss}
        onSubmit={handleUpdateData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  qrData: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BarcodeScanner;