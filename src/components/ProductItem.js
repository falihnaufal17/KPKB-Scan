import React from 'react';
import {List} from 'react-native-paper';

const ProductItem = ({KODE_BARANG, NAMA_BARANG, UNIT, NO_ASLI, KUANTITAS}) => {
  return (
    <List.Item
      title={`${NAMA_BARANG} (${KUANTITAS})`}
      description={`${KODE_BARANG} - ${UNIT} - ${NO_ASLI}`}
    />
  );
};

export default ProductItem;
