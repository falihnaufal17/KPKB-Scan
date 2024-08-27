import React, {FC} from 'react';
import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import ExcelGuideline from '../assets/guideline.png';
import {Text} from 'react-native-paper';
import X from '../assets/icons/X';
import {textColor} from '../constants/colors';

interface GuidelineProps {
  visible: boolean;
  onClose?: () => void;
}

const GuidelineModal: FC<GuidelineProps> = ({visible, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Panduan Excel</Text>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <X />
            </TouchableOpacity>
          </View>
          <ReactNativeZoomableView
            maxZoom={30}
            contentWidth={300}
            contentHeight={150}>
            <Image source={ExcelGuideline} style={styles.image} />
          </ReactNativeZoomableView>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.listText}>1.</Text>
              <Text style={styles.listText}>
                kodebarang --&gt; kode bawaan dari sistem ERP
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>2.</Text>
              <Text style={styles.listText}>
                nama --&gt; nama produk dari sistem ERP
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>3.</Text>
              <Text style={styles.listText}>
                unit --&gt; unit produk dari sistem ERP
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>4.</Text>
              <Text style={styles.listText}>
                barcode --&gt; barcode produk dari sistem ERP
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>5.</Text>
              <Text style={styles.listText}>
                qtysystem --&gt; stok dari sistem ERP
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>6.</Text>
              <Text style={styles.listText}>
                qtyopname --&gt; stok opname oleh petugas
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listText}>7.</Text>
              <Text style={styles.listText}>
                selisih --&gt; hasil dari qtyopname - qtysystem
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GuidelineModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a slight overlay
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: textColor,
  },
  listContainer: {
    rowGap: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    columnGap: 10,
  },
  listText: {
    color: textColor,
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  buttonClose: {
    padding: 10,
  },
});
