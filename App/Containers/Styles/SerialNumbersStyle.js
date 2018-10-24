import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 20,
    marginRight: 25,
    marginLeft: 25,
    paddingTop: 20,
    flex: 1,
  },
  boldLabel: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    flex: 1,
    textAlign: 'center',
    color: Colors.snow
  },
  serial: {
    textAlign: 'center',
    color: "#a0a0a0",
    fontSize: 18,
    width: 150,
  },
  operation: {
    textAlign: 'left',
    color: "#a0a0a0",
    fontSize: 18,
    flex: 1,
  },
  status: {
    width: 150,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  status_text: {
    color: Colors.charcoal,
    textAlign: 'center',
    fontSize: 25
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'red',
    marginRight: 10
  }
})
