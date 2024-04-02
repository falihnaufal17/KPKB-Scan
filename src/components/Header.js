import React from 'react';
import {
  Appbar,
  useTheme,
  Menu,
  TouchableRipple,
  Text,
} from 'react-native-paper';
import propTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signOutAsync} from '../reducers/auth';

const Header = ({title}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{marginBottom: 16}}>
      <Appbar.Header style={{backgroundColor: theme.colors.onPrimaryContainer}}>
        <Appbar.Content title={title} color={theme.colors.background} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableRipple
              onPress={openMenu}
              backgroundColor="transparent"
              style={{marginRight: 16}}>
              <Text
                style={{
                  color: '#FFF',
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

Header.propTypes = {
  title: propTypes.string,
};
