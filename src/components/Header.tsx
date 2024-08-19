import React, {FC} from 'react';
import {Appbar, Menu, TouchableRipple, Text} from 'react-native-paper';
import {View} from 'react-native';
import {signOutAsync} from '../reducers/auth';
import {useAppDispatch, useAppSelector} from '../store';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const {name} = useAppSelector(state => state.auth);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{marginBottom: 16}}>
      <Appbar.Header>
        <Appbar.Content title={title} />
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
