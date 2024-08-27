import React, {useEffect, useState, FC} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {danger, primary, textColor} from '../constants/colors';
import Input from '../components/atoms/Input';
import {
  cancelScannBarcodeAsync,
  scannedBarcodeAsync,
  updateDocumentAsync,
} from '../actions/product';
import {Product} from '../types/product';

interface OpnameFormRoute {
  params: {
    barcode: string;
  };
  key: string;
  name: string;
  path?: string | undefined;
}

const OpnameForm: FC = ({}) => {
  const {scannedData} = useAppSelector(s => s.product);
  const [qty, setQty] = useState<number>(0);
  const [selisih, setSelisih] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {params} = useRoute<OpnameFormRoute>();
  const navigation = useNavigation();
  const {barcode} = params;

  const onChangeQty = (value: string) => {
    const numericText = value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
    const calculateSelisih =
      parseFloat(numericText) - parseFloat(String(scannedData.qtysystem));

    setQty(isNaN(parseFloat(numericText)) ? 0 : parseFloat(numericText));
    setSelisih(
      isNaN(calculateSelisih) ? 0 : parseFloat(calculateSelisih.toFixed(2)),
    );
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const payload: Product = {
        ...scannedData,
        qtyopname: qty,
        difference: selisih,
      };

      await dispatch(updateDocumentAsync(payload));

      navigation.goBack();
    } catch (error: any) {
      console.log('onSave:', error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async () => {
    try {
      await dispatch(cancelScannBarcodeAsync(scannedData.barcode));
      navigation.goBack();
    } catch (error: any) {
      console.log('onCancel:', error);
    }
  };

  useEffect(() => {
    dispatch(scannedBarcodeAsync(barcode));
    console.log('masuk sini');
  }, [barcode]);

  useEffect(() => {
    setQty(scannedData?.qtyopname || 0);
  }, [scannedData?.qtyopname]);

  useEffect(() => {
    setSelisih(parseFloat((scannedData?.difference || 0).toFixed(2)));
  }, [scannedData?.difference]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text selectable style={styles.title}>
          {scannedData?.name || ''}
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Barcode</Text>
          <Text style={styles.value} selectable>
            {barcode}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kode Barang</Text>
          <Text style={styles.value} selectable>
            {scannedData?.code}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Stok</Text>
          <Text style={styles.value} selectable>
            {qty ?? '-'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Stok Pada Sistem</Text>
          <Text style={styles.value} selectable>
            {scannedData?.qtysystem ?? '-'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Selisih</Text>
          <Text style={styles.value} selectable>
            {selisih ?? '-'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Unit</Text>
          <Text style={styles.value} selectable>
            {scannedData?.unit}
          </Text>
        </View>
        <View style={styles.formGroup}>
          <Input
            placeholder="Masukkan jumlah stok terbaru"
            keyboardType="number-pad"
            onChangeText={onChangeQty}
          />
        </View>
        <Button
          mode="contained"
          buttonColor={primary}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          loading={loading}
          disabled={loading}
          onPress={onSave}>
          Ubah
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor={danger}
          onPress={onCancel}>
          Batal
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    color: textColor,
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  value: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  containerStyle: {
    backgroundColor: '#FFF',
    padding: 20,
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qty: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  formGroup: {
    marginBottom: 16,
  },
});

export default OpnameForm;
