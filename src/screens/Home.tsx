import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, ToastAndroid, View} from 'react-native';
import {MD3Colors, Text} from 'react-native-paper';
import ListEmpty from '../components/ListEmpty';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ListHeader from '../components/ListHeader';
import LoadingPopup from '../components/LoadingPopup';
import Scanner from '../components/Scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../store';
import GuidelineModal from '../components/GuidelineModal';

interface HomeProps {
  navigation: {
    navigate: (name: string, params: Record<string, any>) => void;
    push: (name: string) => void;
  };
}

const Home: FC<HomeProps> = ({navigation}) => {
  const {loading, message, data, loadingDownload} = useAppSelector(
    state => state.document,
  );
  const [showGuideline, setShowGuideline] = useState(false);

  const onToggleGuideline = () => setShowGuideline(!showGuideline);

  useEffect(() => {
    if (message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [message]);

  useEffect(() => {
    const fetchFromLocal = async () => {
      const scannedDataAsync = await AsyncStorage.getItem('@filteredData');
      const scannedData = scannedDataAsync
        ? JSON.parse(scannedDataAsync)
        : null;

      if (scannedData) {
        navigation.navigate('Barcode', {scannedData});
      }
    };

    fetchFromLocal();
  }, [data, navigation.navigate]);

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <StatusBar backgroundColor={MD3Colors.primary40} />
      <Header title="KPKB" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 16,
          backgroundColor: '#FFF',
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
          <ListEmpty onShowGuideline={onToggleGuideline} />
        )}
      </View>
      {data.length > 0 ? <Scanner navigation={navigation} /> : null}
      <LoadingPopup visible={loadingDownload} />
      <GuidelineModal visible={showGuideline} onClose={onToggleGuideline} />
    </SafeAreaView>
  );
};

export default Home;
