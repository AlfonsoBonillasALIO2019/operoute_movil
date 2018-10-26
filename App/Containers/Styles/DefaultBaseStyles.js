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
  subHeader: { backgroundColor: '#e2e2e2', width: '100%', paddingVertical: 35 },
  subHeader_title: { color: '#4f6987', textAlign: 'center', fontWeight: '500' },
  subHeader_subtitle: { color: '#4F6987', textAlign: 'center', fontWeight: '400', marginTop: 10 },
  subHeader_text: { color: '#828282', textAlign: 'center', fontWeight: '400' },
  container: {
    backgroundColor: '#e9e9e9',
    paddingTop: 5
  },
  headerTitle: {
    marginLeft: 20
  },
})
