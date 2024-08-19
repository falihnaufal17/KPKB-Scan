import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {uploadDocumentAsync} from '../reducers/document';
import {useAppDispatch} from '../store';
import {primary, textColor} from '../constants/colors';
import Warning from '../assets/icons/Warning';
import BookSquare from '../assets/icons/BookSquare';

const ListEmpty: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Warning />
      <Text style={styles.textNotFound}>Data tidak ditemukan!</Text>
      <Text
        style={[styles.textNotFound, styles.textNotFoundDescription]}
        variant="bodyMedium">
        Silakan unggah file excel dalam bentuk .xlsx, .xls, dan .csv
      </Text>
      <Button
        icon={BookSquare}
        mode="text"
        onPress={() => dispatch(uploadDocumentAsync())}
        textColor={primary}>
        Lihat Panduan
      </Button>
      <Button
        buttonColor={primary}
        icon="upload"
        mode="contained"
        onPress={() => dispatch(uploadDocumentAsync())}
        style={{marginTop: 16}}>
        Unggah File
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNotFound: {
    color: textColor,
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
  },
  textNotFoundDescription: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 0,
  },
});

export default ListEmpty;
