import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button, useTheme, withTheme} from 'react-native-paper';
import {signInAsync, updateName} from '../reducers/auth';
import {useAppDispatch, useAppSelector} from '../store';

const SignIn = () => {
  const theme = useTheme();
  const {name} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (!name) {
      return;
    }

    dispatch(signInAsync(name?.trimStart()));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{textAlign: 'center'}} variant="titleLarge">
          Selamat Datang di KPKB Scanner
        </Text>
        <Text style={{textAlign: 'center'}} variant="titleMedium">
          Silakan isi nama lengkap terlebih dahulu
        </Text>
      </View>
      <View>
        <TextInput
          label="Nama Lengkap"
          mode="outlined"
          style={{marginBottom: 16}}
          onChangeText={v => dispatch(updateName(v.trimStart()))}
          onSubmitEditing={onSubmit}
          keyboardType="default"
          textContentType="name"
          value={name}
        />
        <Button
          disabled={name.length <= 3}
          onPress={onSubmit}
          buttonColor={theme.colors.onPrimaryContainer}
          mode="contained">
          Masuk
        </Button>
      </View>
    </View>
  );
};

export default withTheme(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
});
