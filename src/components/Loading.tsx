import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet, Text, TextStyle} from 'react-native';
import {primary} from '../constants/colors';

interface LoadingProps {
  labelStyle?: TextStyle;
  label?: string;
}

const Loading: FC<LoadingProps> = ({
  labelStyle,
  label = 'Mohon tunggu sedang memuat data',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={64} color={primary} />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 16,
  },
});

export default Loading;
