import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, StyleSheet} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { uploadDocumentAsnyc } from '../reducers/document';

const ListEmpty = () => {
  const theme = useTheme()
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Icon color={theme.colors.tertiary} name="alert-circle-outline" style={{textAlign: 'center'}} size={64} />
      <Text style={[{color: theme.colors.tertiary}, styles.textNotFound]} variant="titleMedium">Data tidak ditemukan!</Text>
      <Text style={[{color: theme.colors.tertiary}, styles.textNotFound]} variant="bodySmall">Silahkan unggah file excel dalam bentuk .xlsx, .xls, dan .csv</Text>
      <Button buttonColor={theme.colors.onPrimaryContainer} icon="upload" mode="contained" onPress={() => dispatch(uploadDocumentAsnyc())} style={{marginTop: 16}}>
        Unggah File
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNotFound: {
    textAlign: 'center',
    marginVertical: 6
  }
})

export default ListEmpty