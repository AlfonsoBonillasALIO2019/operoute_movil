import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../Themes'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
})
