import React, {FC, useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, SafeAreaView} from 'react-native';
import {
  MD3Colors,
  Text,
  TextInput,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import beepSound from '../assets/store-scanner-beep-90395.mp3';
import Loading from '../components/Loading';
import {danger, primary, primary50, textColor} from '../constants/colors';

interface ScannerRoute {
  params: {
    scannedData: {
      barcode: string;
    };
  };
  key: string;
  name: string;
  path?: string | undefined;
}

const Scanner: FC = () => {
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const navigation = useNavigation<{
    navigate: (name: string, params: Record<string, any>) => void;
  }>();
  const route = useRoute<ScannerRoute>();

  const onScanned = (codes: Code[]) => {
    if (codes.length > 0) {
      SoundPlayer.playAsset(beepSound);

      setQrData(codes?.[0]?.value?.substring(1) || '');

      navigation.navigate('OpnameForm', {
        barcode: codes?.[0]?.value?.startsWith('0')
          ? codes[0].value.substring(1)
          : codes[0].value,
      });
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-39', 'code-93', 'ean-8'],
    onCodeScanned: onScanned,
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

  const onChangeCode = (val: string) => {
    setQrData(val);
  };

  const onSubmitCode = () => onScanned([{type: 'unknown', value: qrData}]);

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
        <Text style={styles.formLabel}>
          Barcode sulit dideteksi? Masukkan kode di bawah ini
        </Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          onChangeText={onChangeCode}
          onSubmitEditing={onSubmitCode}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          value={qrData}
          placeholder="Masukkan kode"
          placeholderTextColor="#99A1B7"
          outlineStyle={styles.inputOutline}
          activeOutlineColor={primary}
          contentStyle={styles.inputContent}
          outlineColor="#C4CADA"
        />
        <TouchableRipple
          style={[styles.btnSubmit, !qrData ? styles.btnSubmitDisabled : {}]}
          disabled={!qrData}
          onPress={onSubmitCode}>
          <Text style={styles.txtSubmit}>Cari Produk</Text>
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
    backgroundColor: primary,
    borderRadius: 6,
  },
  btnSubmitDisabled: {
    backgroundColor: primary50,
  },
  txtSubmit: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: danger,
    fontSize: 16,
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  formGroup: {
    backgroundColor: '#FFF',
    padding: 20,
  },
  formLabel: {
    color: textColor,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Roboto-Medium',
  },
  inputOutline: {
    borderRadius: 6,
    borderWidth: 1,
  },
  inputContent: {
    padding: 12,
    color: textColor,
  },
  input: {
    marginBottom: 10,
  },
});

export default Scanner;
