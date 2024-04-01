import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ModalForm from '../components/ModalForm';
import {MD3Colors, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BarcodeScanner = ({route}) => {
  const [qrData, setQrData] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (route.params?.scannedData?.barcode) {
      setQrData(route.params?.scannedData?.barcode);
      setVisible(true);
    }
  }, [route.params?.scannedData?.barcode]);

  const handleInputCode = val => {
    setQrData(val);
  };

  const handleBarCodeScanned = data => {
    let resQR = '';

    if (data.type !== 'QR_CODE') {
      resQR = data.data;
      if (data.data.toString().charAt(0) === '0') {
        resQR = data.data.substring(1);
        setQrData(resQR);
      }
      setQrData(resQR);
      setVisible(true);
    } else {
      ToastAndroid.show('Barcode not found', ToastAndroid.SHORT);
    }
  };

  const onDismiss = async () => {
    await AsyncStorage.removeItem('@filteredData');
    setQrData('');
    setVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
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
        ratio="1:1"
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code93,
        ]}
        type={RNCamera.Constants.Type.back}
      />
      <View
        style={{
          backgroundColor: '#FFF',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text variant="bodyMedium" style={{marginBottom: 8}}>
          Barcode sulit terdeteksi? masukan kode ke sini
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#CCC',
            borderRadius: 10,
            marginBottom: 16,
            paddingHorizontal: 16,
          }}
          keyboardType="number-pad"
          onChangeText={v => handleInputCode(v)}
          onSubmitEditing={() => handleBarCodeScanned({type: '', data: qrData})}
          value={qrData}
          placeholder="Masukan kode"
        />
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            backgroundColor: MD3Colors.primary40,
            marginBottom: 16,
            borderRadius: 10,
          }}
          activeOpacity={0.8}
          onPress={() => handleBarCodeScanned({type: '', data: qrData})}>
          <Text style={{textAlign: 'center', color: MD3Colors.primary100}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <ModalForm
        visible={visible}
        barcode={qrData}
        onDismiss={onDismiss}
        setQrData={setQrData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get('window').width,
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
