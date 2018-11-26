import { StackNavigator, TabNavigator } from 'react-navigation'
import WorkOrderPage from '../Containers/WorkOrderPage'
import ControllerScreen from '../Containers/ControllerScreen'
import FaceCameraScreen from '../Containers/FaceCameraScreen'
import OperationPage from '../Containers/OperationPage'
import OperationQuickAccessPage from '../Containers/OperationQuickAccessPage'
import WorkOrdersPage from '../Containers/WorkOrdersPage'
import RouteCardPage from '../Containers/RouteCardPage'
import styles from './Styles/NavigationStyles'

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

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ControllerScreen: { screen: ControllerScreen },
  FaceCameraScreen: { screen: FaceCameraScreen },
  OperationPage: { screen: OperationPage },
  OperationQuickAccessPage: { screen: OperationQuickAccessPage },
  RouteCardPage: { screen: RouteCardPage },
  WorkOrderPage: { screen: WorkOrderPage },
  Home: { screen: WorkOrdersPage }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
