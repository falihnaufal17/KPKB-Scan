import React from 'react'
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper'

const LoadingPopup = ({
  visible
}) => {
  return (
    <Portal>
      <Modal visible={visible}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text variant="titleLarge" style={{color: '#FFF', textAlign: 'center', marginTop: 16}}>Mengunduh</Text>
      </Modal>
    </Portal>
  )
}

export default LoadingPopup