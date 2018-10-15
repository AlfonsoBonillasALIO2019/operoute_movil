import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo_topBar,
    width: Metrics.images.logo_topBar,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
})
