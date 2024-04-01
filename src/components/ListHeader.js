import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, MD3Colors} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {clearDocument, downloadDocumentAsync} from '../reducers/document';

const ListHeader = ({data}) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <Button
        buttonColor={MD3Colors.error50}
        icon="trash-can-outline"
        mode="contained"
        onPress={() =>
          dispatch(clearDocument({message: 'Dokumen dibersihkan'}))
        }>
        Bersihkan
      </Button>
      <Button
        buttonColor={MD3Colors.tertiary50}
        icon="download"
        mode="contained"
        onPress={() => dispatch(downloadDocumentAsync(data))}>
        Unduh
      </Button>
    </View>
  );
};

export default memo(
  ListHeader,
  (prevState, nextState) =>
    JSON.stringify(prevState) === JSON.stringify(nextState),
);
