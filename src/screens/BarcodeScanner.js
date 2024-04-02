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
import ModalForm from '../components/ModalForm';
import {MD3Colors, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

const BarcodeScanner = ({route}) => {
  const [qrData, setQrData] = useState('');
  const [visible, setVisible] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const handleBarCodeScanned = codes => {
    let resQR = '';
    const [data] = codes;

    if (data?.value) {
      resQR = data?.value;
      if (resQR.toString().charAt(0) === '0') {
        resQR = resQR.substring(1);
      }

      setQrData(resQR);
      setVisible(true);
    } else {
      ToastAndroid.show('Barcode not found', ToastAndroid.SHORT);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-39', 'code-93', 'ean-8'],
    onCodeScanned: handleBarCodeScanned,
  });

  useEffect(() => {
    const onRequestPermission = async () => {
      await requestPermission();
    };

    if (!hasPermission) {
      onRequestPermission();
    }

    if (route.params?.scannedData?.barcode) {
      setQrData(route.params?.scannedData?.barcode);
      setVisible(true);
    }
  }, [hasPermission, requestPermission, route.params?.scannedData?.barcode]);

  const handleInputCode = val => {
    setQrData(val);
  };

  const onDismiss = async () => {
    await AsyncStorage.removeItem('@filteredData');
    setQrData('');
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {device ? (
        <Camera
          style={styles.preview}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Camera device is not found!</Text>
        </View>
      )}
      <View style={styles.formGroup}>
        <Text variant="bodyMedium" style={{marginBottom: 8}}>
          Barcode sulit terdeteksi? masukan kode ke sini
        </Text>
        <TextInput
          style={styles.formControl}
          keyboardType="number-pad"
          onChangeText={v => handleInputCode(v)}
          onSubmitEditing={() => handleBarCodeScanned({type: '', data: qrData})}
          value={qrData}
          placeholder="Masukan kode"
        />
        <TouchableOpacity
          style={[styles.btnSubmit, !qrData ? styles.btnSubmitDisabled : {}]}
          activeOpacity={0.8}
          disabled={!qrData}
          onPress={() => handleBarCodeScanned({type: '', data: qrData})}>
          <Text style={styles.txtSubmit}>Submit</Text>
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
  btnSubmit: {
    paddingVertical: 12,
    backgroundColor: MD3Colors.primary40,
    marginBottom: 16,
    borderRadius: 10,
  },
  btnSubmitDisabled: {
    backgroundColor: MD3Colors.secondary70,
  },
  txtSubmit: {
    textAlign: 'center',
    color: MD3Colors.primary100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: MD3Colors.error40,
    fontSize: 16,
    letterSpacing: 0.8,
  },
  formGroup: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default BarcodeScanner;
