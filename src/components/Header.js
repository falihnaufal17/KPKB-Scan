import React from 'react';
import {Appbar, Menu, TouchableRipple, Text} from 'react-native-paper';
import propTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signOutAsync} from '../reducers/auth';

const Header = ({title}) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth);

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
              backgroundColor="transparent"
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

Header.propTypes = {
  title: propTypes.string,
};
