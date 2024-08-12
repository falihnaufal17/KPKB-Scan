import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, SafeAreaView} from 'react-native';
import {
  MD3Colors,
  Text,
  withTheme,
  TextInput,
  TouchableRipple,
  Button,
} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import beepSound from '../assets/store-scanner-beep-90395.mp3';
import Loading from '../components/Loading';

const BarcodeScanner = ({route}) => {
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  /**
   *
   * @param {object[]} codes
   */
  const handleBarCodeScanned = codes => {
    if (codes.length > 0) {
      SoundPlayer.playAsset(beepSound);
      setQrData(codes?.[0]?.value?.substring(1));
      navigation.navigate('OpnameForm', {
        barcode: codes?.[0]?.value?.substring(1),
      });
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-39', 'code-93', 'ean-8'],
    onCodeScanned: handleBarCodeScanned,
  });

  const onRequestPermission = useCallback(async () => {
    try {
      await requestPermission();
    } catch (e) {
      console.log(e);
    }
  }, [requestPermission]);

  const onLoadCamera = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      setLoading(true);
      setQrData('');
    };
  }, []);

  useFocusEffect(onLoadCamera);

  useEffect(() => {
    if (!hasPermission) {
      onRequestPermission();
    }

    if (route.params?.scannedData?.barcode) {
      setQrData(route.params?.scannedData?.barcode);
    }
  }, [hasPermission, onRequestPermission, route.params?.scannedData?.barcode]);

  const handleInputCode = val => {
    setQrData(val);
  };

  // const onDismiss = async () => {
  //   await AsyncStorage.removeItem('@filteredData');
  //   setQrData('');
  // };

  if (!hasPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Kamera tidak diizinkan</Text>
        <Button onPress={onRequestPermission} mode="contained">
          Izinkan
        </Button>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Perangkat kamera tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading
          labelStyle={{color: MD3Colors.neutral10}}
          label="Sedang menyiapkan kamera"
        />
      ) : (
        <Camera
          style={styles.preview}
          device={device}
          codeScanner={codeScanner}
          onError={e => console.log(e)}
          isActive={true}
        />
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
          mode="outlined"
        />
        <TouchableRipple
          style={[styles.btnSubmit, !qrData ? styles.btnSubmitDisabled : {}]}
          activeOpacity={0.8}
          disabled={!qrData}
          onPress={() => handleBarCodeScanned([{type: '', value: qrData}])}>
          <Text style={styles.txtSubmit}>Submit</Text>
        </TouchableRipple>
      </View>
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
    marginBottom: 16,
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
  },
});

export default withTheme(BarcodeScanner);
