import React, {FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Text, TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {restoreToken, signInAsync, updateName} from '../reducers/auth';
import {useAppDispatch, useAppSelector} from '../store';
import {primary, textColor} from '../constants/colors';
import KPKBLogo from '../assets/logo-kpkb-2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn: FC = () => {
  const {name, loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const biodataAsnyc = (await AsyncStorage.getItem('biodata')) || null;
        const biodata = JSON.parse(biodataAsnyc as string);

        dispatch(restoreToken(biodata));
      } catch (e: any) {
        ToastAndroid.show(e, ToastAndroid.SHORT);
      }
    };

    bootstrapAsync();
  }, []);

  const onSubmit = () => {
    if (!name) {
      return;
    }

    dispatch(signInAsync(name.trimStart()));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.title}>di</Text>
          <Text style={styles.title}>KPKB Mobile</Text>
          <Image source={KPKBLogo} style={styles.logo} />
          <Text style={[styles.title, styles.subtitle]}>
            KPKB Mobile adalah aplikasi untuk melakukan opname stok produk yang
            berada di Koperasi Pegawai Kota Bandung
          </Text>
        </View>
        <View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                style={{marginBottom: 16}}
                size="large"
                color={primary}
              />
              <Text style={styles.subtitle}>Memeriksa token...</Text>
            </View>
          ) : (
            <>
              <Text style={[styles.subtitle, styles.inputLabel]}>
                Nama Lengkap
              </Text>
              <TextInput
                mode="outlined"
                style={{marginBottom: 16}}
                onChangeText={v => dispatch(updateName(v.trimStart()))}
                onSubmitEditing={onSubmit}
                keyboardType="default"
                textContentType="name"
                value={name}
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="#99A1B7"
                outlineStyle={styles.inputOutline}
                activeOutlineColor={primary}
                contentStyle={styles.inputContent}
              />
              <Button
                disabled={name.length <= 3}
                onPress={onSubmit}
                buttonColor={primary}
                mode="contained"
                style={styles.button}>
                Masuk
              </Button>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: textColor,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
  },
  logo: {
    width: 175,
    height: 175,
    marginVertical: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    rowGap: 32,
  },
  inputOutline: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C4CADA',
  },
  inputContent: {
    padding: 12,
    color: textColor,
  },
  button: {
    borderRadius: 6,
  },
  loadingContainer: {flex: 1, justifyContent: 'center'},
  inputLabel: {
    textAlign: 'left',
    marginBottom: 10,
  },
});
