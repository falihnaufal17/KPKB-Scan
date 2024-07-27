/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, ToastAndroid, View} from 'react-native';
import {MD3Colors, Text} from 'react-native-paper';
import ListEmpty from '../components/ListEmpty';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ListHeader from '../components/ListHeader';
import LoadingPopup from '../components/LoadingPopup';
import {useSelector} from 'react-redux';
import Scanner from '../components/Scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  const {loading, message, data, loadingDownload} = useSelector(
    state => state.document,
  );

  React.useEffect(() => {
    if (message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [message]);

  React.useEffect(() => {
    const fetchFromLocal = async () => {
      const scannedData =
        JSON.parse(await AsyncStorage.getItem('@filteredData')) || null;

      if (scannedData) {
        navigation.navigate('Barcode', {scannedData});
      }
    };

    fetchFromLocal();
  }, [data, navigation]);
  console.log('LENGTH DATA', data.length);
  return (
    <>
      <StatusBar backgroundColor={MD3Colors.primary40} />
      <Header title="KPKB" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 16,
        }}>
        {loading ? (
          <Loading />
        ) : data.length > 0 ? (
          <>
            <Text
              variant="titleLarge"
              style={{marginBottom: 16, textAlign: 'center'}}>
              Data berhasil diunggah!
            </Text>
            <Text
              variant="bodyLarge"
              style={{marginBottom: 16, textAlign: 'center'}}>
              Terdeteksi <Text style={{fontWeight: '800'}}>{data.length}</Text>{' '}
              data produk
            </Text>
            <Text
              variant="bodyLarge"
              style={{marginBottom: 16, textAlign: 'center'}}>
              Silakan klik ikon <Icon name="barcode-scan" size={20} /> untuk
              melakukan scan barcode pada produk atau lakukan aksi di bawah ini
            </Text>
            <ListHeader data={data} />
          </>
        ) : (
          <ListEmpty />
        )}
      </View>
      {data.length > 0 ? <Scanner navigation={navigation} /> : null}
      <LoadingPopup visible={loadingDownload} />
    </>
  );
};

export default Home;
