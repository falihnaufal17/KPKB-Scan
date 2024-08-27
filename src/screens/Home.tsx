import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {MD3Colors, Text} from 'react-native-paper';
import ListEmpty from '../components/ListEmpty';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ListHeader from '../components/ListHeader';
import LoadingPopup from '../components/LoadingPopup';
import Scanner from '../components/Scanner';
import {useAppDispatch, useAppSelector} from '../store';
import GuidelineModal from '../components/GuidelineModal';
import ScanBarcode from '../assets/icons/ScanBarcode';
import {textColor} from '../constants/colors';
import {getProductsAsync} from '../actions/product';

interface HomeProps {
  navigation: {
    navigate: (name: string, params: Record<string, any>) => void;
    push: (name: string) => void;
  };
}

const Home: FC<HomeProps> = ({navigation}) => {
  const {loading, message, data, loadingDownload} = useAppSelector(
    state => state.product,
  );
  const [showGuideline, setShowGuideline] = useState(false);
  const dispatch = useAppDispatch();

  const onToggleGuideline = () => setShowGuideline(!showGuideline);

  useEffect(() => {
    if (message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [message]);

  // useEffect(() => {

  // }, [data, navigation.navigate]);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>Data berhasil diunggah!</Text>
            <Text style={[styles.description, styles.descriptionCount]}>
              Terdeteksi <Text style={{fontWeight: '800'}}>{data.length}</Text>{' '}
              data produk
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>Silakan klik ikon</Text>
              <ScanBarcode />
              <Text style={styles.description}>untuk melakukan pemindaian</Text>
              <Text style={styles.description}>pada barcode produk</Text>
            </View>
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

const styles = StyleSheet.create({
  container: {backgroundColor: '#FFF', flex: 1},
  title: {
    color: textColor,
    fontSize: 26,
    fontFamily: 'Roboto-Medium',
    marginBottom: 16,
    textAlign: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: textColor,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  descriptionCount: {
    marginBottom: 16,
  },
});
