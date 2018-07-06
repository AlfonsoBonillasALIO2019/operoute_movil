import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreenGreen extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4db85f'
      }}>
        <View onPress={() =>
          navigate('LaunchScreenGreen')
        } style={{width: 50, height: 50, backgroundColor: '#2c9a6b'}} />
        <View style={{width: 50, height: 50, backgroundColor: '#abd059'}} />
        <View style={{width: 50, height: 50, backgroundColor: '#4db85f'}} />
      </View>
    );
  }
}
