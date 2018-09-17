import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainBackgroundColor: {
    backgroundColor: '#4f6987'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  container: {
    backgroundColor: '#e9e9e9',
    paddingTop: 5
  },
  headerTitle: {
    marginLeft: 20
  },
})
