import React, {useEffect, useState, useMemo, FC} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {updateDocumentAsync, uploadDocument} from '../reducers/product';
import {useAppDispatch, useAppSelector} from '../store';
import {useRoute} from '@react-navigation/native';
import {danger, primary, textColor} from '../constants/colors';
import Input from '../components/atoms/Input';
// import AsyncStorage from '@react-native-async-storage/async-storage';

interface OpnameFormRoute {
  params: {
    onDismiss: () => void;
    barcode: string;
  };
  key: string;
  name: string;
  path?: string | undefined;
}

const OpnameForm: FC = ({}) => {
  const {data} = useAppSelector(s => s.document);
  const [qty, setQty] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any>({});
  const [selisih, setSelisih] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {params} = useRoute<OpnameFormRoute>();
  const {barcode, onDismiss} = params;

  // Memoize the creation of a Map for fast lookups
  const dataMap = useMemo(() => {
    const map = new Map();

    data.forEach(item => {
      if (item.barcode) {
        map.set(item.barcode.toString(), item);
      }
    });
    return map;
  }, [data]);

  const onChangeQty = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');

    setQty(numericText);
    const calculateSelisih =
      parseInt(numericText) - parseInt(filteredData.qtysystem);
    setSelisih(isNaN(calculateSelisih) ? 0 : calculateSelisih);
  };

  useEffect(() => {
    if (barcode) {
      // Use the Map for fast lookup
      const filterData = dataMap.get(barcode.toString());

      // if (filterData) {
      //   saveToLocal(filterData);
      // }

      setFilteredData(filterData);
    }
  }, [barcode, dataMap]);

  // const saveToLocal = async filterData => {
  //   await AsyncStorage.setItem('@filteredData', JSON.stringify(filterData));
  // };

  // useEffect(() => {
  //   setQty(filteredData?.qtyopname || filteredData?.qty);
  // }, [filteredData?.qtyopname, filteredData?.qty]);

  // useEffect(() => {
  //   setSelisih(filteredData?.selisih);
  // }, [filteredData?.selisih]);

  return (
    <SafeAreaView style={styles.container}>
      <Text selectable style={styles.title}>
        {filteredData?.nama || ''}
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
          {filteredData?.kodebarang}
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
          {filteredData?.qtysystem ?? '-'}
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
          {filteredData?.unit}
        </Text>
      </View>
      <View style={styles.formGroup}>
        <Input
          placeholder="Masukkan jumlah stok terbaru"
          keyboardType="number-pad"
          onChangeText={onChangeQty}
          value={qty}
        />
      </View>
      <Button
        mode="contained"
        buttonColor={primary}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        loading={loading}
        disabled={loading}
        onPress={async () => {
          setLoading(true);

          const newArray = [...data];
          const index = newArray.findIndex(
            obj => obj.kodebarang === filteredData?.kodebarang,
          );

          if (index !== -1) {
            newArray[index] = {
              ...newArray[index],
              qtyopname: qty,
              selisih,
            };
          }

          const payload = newArray;

          await dispatch(
            updateDocumentAsync({
              data: payload,
              id: '',
              value: undefined,
            }),
          );
          await dispatch(
            uploadDocument({
              loading: false,
              data: payload,
              message: 'Dokumen berhasil diperbarui',
            }),
          );
          setLoading(false);
          onDismiss();
        }}>
        Ubah
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        buttonColor={danger}
        onPress={onDismiss}>
        Batal
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
