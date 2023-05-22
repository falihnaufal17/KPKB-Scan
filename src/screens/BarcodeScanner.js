import React, { useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import {RNCamera} from 'react-native-camera';
import ModalForm from '../components/ModalForm';

const BarcodeScanner = () => {
  const [qrData, setQrData] = useState('');
  const [visible, setVisible] = useState(false)

  const handleBarCodeScanned = (data) => {
    let resQR = ''
    console.log(data)

    if (data.type !== 'QR_CODE') {
      resQR = data.data
      if (data.data.toString().charAt(0) === '0') {
        resQR = data.data.substring(1)
        setQrData(resQR)
      }
      setQrData(resQR)
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
        focusable={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        ratio='1:1'
        barCodeTypes={[RNCamera.Constants.BarCodeType.ean13, RNCamera.Constants.BarCodeType.ean8]}
        type={RNCamera.Constants.Type.back}
        orientation={RNCamera.Constants.Orientation.landscapeLeft}
      />
      <ModalForm
        visible={visible}
        barcode={qrData}
        onDismiss={onDismiss}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "100%",
    height: 240
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  qrData: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BarcodeScanner;
