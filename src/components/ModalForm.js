import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native';
import {Modal, Portal, Text, TextInput, Button, MD3Colors } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../reducers/document';

const ModalForm = ({
  visible = false,
  onDismiss,
  data = [],
  barcode
}) => {
  let filteredData = data.find(item => item.barcode === barcode)
  const [qty, setQty] = useState(filteredData?.qty || 0)
  const dispatch = useDispatch()

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}
      >
        <Animatable.View animation="slideInRight" duration={800}>
          <Text variant="titleLarge">Tambah kuantitas</Text>
          <Text>{filteredData?.nama}</Text>
          <Text>Kode Barang: {filteredData?.kodebarang}</Text>
          <Text>Unit: {filteredData?.unit}</Text>
          <TextInput
            label="Jumlah"
            mode="outlined"
            placeholder="Masukan jumlah"
            keyboardType="number-pad"
            style={styles.qty}
            onChangeText={v => setQty(v)}
          />
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              buttonColor={MD3Colors.error50}
              style={styles.btnCancel}
              onPress={onDismiss}
            >
              Batal
            </Button>
            <Button
              mode="contained"
              onPress={() => dispatch(updateDocument({id: filteredData?.kodebarang, value: qty, onDismiss}))}
            >
              Ubah
            </Button>
          </View>
        </Animatable.View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFF',
    padding: 20,
    flex: 1
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  qty: {
    marginBottom: 16
  },
  btnCancel: {
    marginRight: 16
  }
})

export default ModalForm