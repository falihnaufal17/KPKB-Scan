import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import propTypes from 'prop-types'
import { View } from 'react-native'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Header = ({title, onImport}) => {
  const theme = useTheme()

  return (
    <View style={{marginBottom: 16}}>
      <Appbar.Header style={{backgroundColor: theme.colors.onPrimaryContainer}}>
        <Appbar.Content title={title} color={theme.colors.background} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} color={theme.colors.background} />
      </Appbar.Header>
    </View>
  )
}

export default Header;

Header.propTypes = {
  title: propTypes.string
}