/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FAB, MD3Colors, ActivityIndicator } from 'react-native-paper';
import ListEmpty from '../components/ListEmpty';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductItem from '../components/ProductItem';
import ListHeader from '../components/ListHeader';
import LoadingPopup from '../components/LoadingPopup';

const Home = ({navigation, route}) => {
  const {
    loading,
    sheetData,
    handleUpload,
    clearSheetData,
    handleDownload,
    loadingDownload,
    data,
    handleLoadMore,
    loadingMore
  } = route.params
  const contentContainerStyle = {}

  if (data?.length === 0) {
    Object.assign(contentContainerStyle, {contentContainerStyle: {
      flex: 1
    }})
  }

  return (
    <>
    <Header title="KPKB" />
    <FlatList
      data={data}
      keyExtractor={(i, key) => `${i.kode}${key}`}
      renderItem={({ item }) => <ProductItem KODE_BARANG={item?.kodebarang} NAMA_BARANG={item?.nama} NO_ASLI={item?.barcode} UNIT={item?.unit} KUANTITAS={item?.qty || '-'} />}
      ListEmptyComponent={loading ? <Loading /> : <ListEmpty onImport={handleUpload} />}
      {...contentContainerStyle}
      ListHeaderComponent={data?.length > 0 ? <ListHeader onClear={clearSheetData} onDownload={handleDownload} /> : null}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
    {data.length > 0 ? (
      <FAB
        icon="barcode-scan"
        style={styles.fab}
        color={MD3Colors.primary100}
        onPress={() => navigation.push('Barcode', {sheetData})}
      />
    ) : null}
    <LoadingPopup visible={loadingDownload} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: MD3Colors.primary10
  },
})
