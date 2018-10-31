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
  view_main: {
    backgroundColor: '#e2e2e2',
    width: '100%',
    height: 400
  },
  view_main_thumb: {
    height: 300,
    width: null,
    flex: 1,
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
  navBackButton: {
    color: '#ffffff',
    marginRight: 10,
    marginLeft: 15
  },
  noResultsRow: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 30,
    marginRight: 30,
    marginLeft: 25,
    paddingTop: 30,
    flex: 1,
  },
  noResultsText: {
    textAlign: 'center',
    color: "#a0a0a0",
    fontSize: 18,
    flex: 1,
  },
  btn_confirm: {
    borderColor: '#4f6987',
    fontWeight: '500',
    paddingBottom: 10,
    paddingRight: 15,
    color: '#4f6987',
    paddingLeft: 15,
    paddingTop: 10,
    borderWidth: 1,
  },
  color_gray: {
    color: '#828282'
  },
  color_light_gray: {
    color: '#dadada'
  },
  color_blue: {
    color: '#4f6987'
  },
  dialog_title: {
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 10
  },
})
