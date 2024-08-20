import React, {FC} from 'react';
import {Appbar, Menu, TouchableRipple, Text} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import {signOutAsync} from '../reducers/auth';
import {useAppDispatch, useAppSelector} from '../store';
import KPKBLogo from '../assets/logo-kpkb-2.png';
import {textColor} from '../constants/colors';

interface HeaderProps {
  title: string;
}

const Title: FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.titleContainer}>
      <Image source={KPKBLogo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const Header: FC<HeaderProps> = ({title}) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const {name} = useAppSelector(state => state.auth);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{marginBottom: 16}}>
      <Appbar.Header>
        <Appbar.Content title={<Title title={title} />} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableRipple
              onPress={openMenu}
              background="transparent"
              style={{marginRight: 16}}>
              <Text
                style={{
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}>
                {name}
              </Text>
            </TouchableRipple>
          }>
          <Menu.Item onPress={() => dispatch(signOutAsync())} title="Keluar" />
        </Menu>
      </Appbar.Header>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 42,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  title: {
    fontSize: 24,
    color: textColor,
    fontFamily: 'Roboto-Medium',
  },
});
