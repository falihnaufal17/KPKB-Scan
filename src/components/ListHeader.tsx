import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '../store';
import TrashSquare from '../assets/icons/TrashSquare';
import {danger, success} from '../constants/colors';
import FileDown from '../assets/icons/FileDown';
import {clearDocumentAsync, downloadDocumentAsync} from '../actions/product';

interface ListHeaderProps {
  data: any[];
}

const ListHeader: FC<ListHeaderProps> = ({data}) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Button
        buttonColor={danger}
        labelStyle={styles.labelButton}
        icon={TrashSquare}
        mode="contained"
        style={styles.button}
        onPress={() =>
          dispatch(clearDocumentAsync({message: 'Dokumen dibersihkan'}))
        }>
        Bersihkan
      </Button>
      <Button
        buttonColor={success}
        labelStyle={styles.labelButton}
        icon={FileDown}
        mode="contained"
        style={styles.button}
        onPress={() => dispatch(downloadDocumentAsync(data))}>
        Unduh
      </Button>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  labelButton: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    color: '#FFF',
  },
  button: {
    borderRadius: 6,
  },
});
