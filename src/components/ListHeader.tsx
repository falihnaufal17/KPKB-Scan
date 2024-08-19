import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, MD3Colors} from 'react-native-paper';
import {clearDocumentAsync, downloadDocumentAsync} from '../reducers/document';
import {useAppDispatch} from '../store';

interface ListHeaderProps {
  data: any[];
}

const ListHeader: FC<ListHeaderProps> = ({data}) => {
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <Button
        buttonColor={MD3Colors.error50}
        labelStyle={{fontSize: 16}}
        icon="trash-can-outline"
        mode="contained"
        onPress={() =>
          dispatch(clearDocumentAsync({message: 'Dokumen dibersihkan'}))
        }>
        Bersihkan
      </Button>
      <Button
        buttonColor={MD3Colors.tertiary50}
        labelStyle={{fontSize: 16}}
        icon="download"
        mode="contained"
        onPress={() => dispatch(downloadDocumentAsync(data))}>
        Unduh
      </Button>
    </View>
  );
};

export default ListHeader;
