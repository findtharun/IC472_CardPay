import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text
} from 'react-native';
import {ActivityIndicator} from 'react-native';
const Loader = props => {
  const {
    loading
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
      
        <View style={styles.activityIndicatorWrapper}>
        <Text>please wait for a minute</Text>
        <Text>uploading image to server...</Text>
          <ActivityIndicator
            animating={loading}
            size="large"
            color='#00ff00' />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 200,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;