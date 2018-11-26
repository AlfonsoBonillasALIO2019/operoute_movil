import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    marginVertical: Metrics.smallMargin,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    flex: 1
  },
  boldLabel: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  text16: {
    fontSize: 16
  },
  textGray: {
    color: Colors.charcoal,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    color: Colors.snow
  },
  serial: {
    width: 150,
    textAlign: 'center',
    color: Colors.charcoal,
    fontSize: 16
  },
  badge: {
    paddingBottom: 2,
    borderRadius: 15,
    paddingTop: 2,
    height: 30,
    width: 125
  },
  operation: {
    flex: 1,
    textAlign: 'left',
    color: Colors.charcoal,
    fontSize: 16
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
    fontSize: 16
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  title: {
    color: Colors.facebook
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'red',
    marginRight: 10
  }
})
