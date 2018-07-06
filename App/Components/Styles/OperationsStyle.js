import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },  
  row: {
    flex: 1,
    padding:15,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: Colors.steel,
    borderBottomWidth: 1 ,
    marginHorizontal:20
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
    width:150,
    textAlign: 'center',
    color: Colors.charcoal,
    fontSize: 25
  },
  operation: {
    flex: 1,
    textAlign: 'left',
    color: Colors.charcoal,
    fontSize: 25
  },
  status: {
    width:150,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems:'center'
  },
  status_text: {
    color: Colors.charcoal,
    textAlign: 'center',
    fontSize: 25
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  title:{
    color: Colors.facebook
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25/2,
    backgroundColor: 'red',
    marginRight:10
  }
})
