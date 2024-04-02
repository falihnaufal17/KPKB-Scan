import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  MD3Colors,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {updateDocumentAsync} from '../reducers/document';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalForm = ({visible = false, onDismiss, barcode}) => {
  const {data} = useSelector(s => s.document);
  const [qty, setQty] = useState(filteredData?.qty || 0);
  const [filteredData, setFilteredData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (barcode) {
      const filterData = data.find(item => {
        return item.barcode?.toString() === barcode?.toString();
      });

      if (filterData) {
        saveToLocal(filterData);
      }

      setFilteredData(filterData);
    }
  }, [barcode, data]);

  const saveToLocal = async filterData => {
    await AsyncStorage.setItem('@filteredData', JSON.stringify(filterData));
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}>
        <Animatable.View animation="slideInRight" duration={800}>
          <Text
            variant="titleLarge"
            style={{marginBottom: 8, textAlign: 'center'}}>
            Tambah kuantitas
          </Text>
          <Text
            variant="titleLarge"
            selectable
            style={{marginBottom: 24, textAlign: 'center'}}>
            {filteredData?.nama}
          </Text>
          <View style={styles.row}>
            <Text variant="bodyMedium">Barcode Terdeteksi</Text>
            <Text variant="bodyMedium" selectable style={{fontWeight: '700'}}>
              {barcode}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium">Kode Barang</Text>
            <Text variant="bodyMedium" selectable style={{fontWeight: '700'}}>
              {filteredData?.kodebarang}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium">Jumlah</Text>
            <Text variant="bodyMedium" selectable style={{fontWeight: '700'}}>
              {filteredData?.qty ?? '-'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium">Jumlah Pada Sistem</Text>
            <Text variant="bodyMedium" selectable style={{fontWeight: '700'}}>
              {filteredData?.qtysystem ?? '-'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={{marginBottom: 16}}>
              Unit
            </Text>
            <Text variant="bodyMedium" selectable style={{fontWeight: '700'}}>
              {filteredData?.unit}
            </Text>
          </View>
          <TextInput
            label="Jumlah"
            mode="outlined"
            placeholder="Masukan jumlah"
            keyboardType="number-pad"
            style={styles.qty}
            onChangeText={v => setQty(v)}
          />
          <Button
            mode="contained"
            style={{marginBottom: 16, paddingVertical: 4}}
            labelStyle={{fontSize: 16}}
            onPress={() =>
              dispatch(
                updateDocumentAsync({
                  id: filteredData?.kodebarang,
                  value: qty,
                  onDismiss,
                }),
              )
            }>
            Ubah
          </Button>
          <Button
            mode="contained"
            style={{marginBottom: 16, paddingVertical: 4}}
            labelStyle={{fontSize: 16}}
            buttonColor={MD3Colors.error50}
            onPress={onDismiss}>
            Batal
          </Button>
        </Animatable.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 6,
  },
});

export default ModalForm;
