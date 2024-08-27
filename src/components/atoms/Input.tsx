import {StyleSheet} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {primary, textColor} from '../../constants/colors';
import {FC} from 'react';

interface InputProps extends TextInputProps {}

const Input: FC<InputProps> = props => {
  return (
    <TextInput
      mode="outlined"
      style={styles.input}
      placeholderTextColor="#99A1B7"
      outlineStyle={styles.inputOutline}
      activeOutlineColor={primary}
      contentStyle={styles.inputContent}
      outlineColor="#C4CADA"
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputOutline: {
    borderRadius: 6,
    borderWidth: 1,
  },
  inputContent: {
    padding: 12,
    color: textColor,
  },
  input: {
    marginBottom: 10,
  },
});
