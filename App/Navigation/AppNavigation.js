import { StackNavigator, TabNavigator } from 'react-navigation'
import PageScreen from '../Containers/PageScreen'
import ControllerScreen from '../Containers/ControllerScreen'
import FaceCameraScreen from '../Containers/FaceCameraScreen'
import OperationScreen from '../Containers/OperationScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LaunchScreenGreen from '../Containers/LaunchScreenGreen'
import HomeScreen from '../Containers/HomeScreen'
import OrderScreen from '../Containers/OrderScreen'
import SerialNumbers from '../Containers/SerialNumbers'

import styles from './Styles/NavigationStyles'

import React from 'react';

import { Text, View } from 'react-native';

// create custom transitioner without the opacity animation, ie. for iOS
function forVertical (props) {
  const { layout, position, scene } = props

  const index = scene.index
  const height = layout.initHeight

  const translateX = 0
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]),
    outputRange: ([height, 0, 0])
  })

  return {
    transform: [{ translateX }, { translateY }]
  }
}
const TabStack = TabNavigator({
  Order: { screen: OrderScreen },
  SerialNumbers: { screen: SerialNumbers },
});

const ModalStack = StackNavigator(
  {
    PageScreen: { screen: PageScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  	initialRouteName: 'PageScreen',
    transitionConfig: () => ({ screenInterpolator: forVertical }),
    cardStyle: {
      backgroundColor:"transparent",
    }
  }
);

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ControllerScreen: { screen: ControllerScreen },
  FaceCameraScreen: { screen: FaceCameraScreen },
  Operation: { screen: OperationScreen },
  Home: { screen: HomeScreen },
  Modal: { screen: ModalStack },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
