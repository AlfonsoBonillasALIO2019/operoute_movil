import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  rCListItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 30,
    paddingRight: 30,
    paddingTop: 30,
    marginLeft: 0,
    flex: 1
  },
  label: {
    textAlign: 'right',
    color: '#4f6987',
    fontSize: 18,
    width: 150
  },
  label_gray: {
    fontWeight: '300',
    color: '#a0a0a0',
    fontSize: 18,
    flex: 1,
  },
  mock_label_value: {
    backgroundColor: '#dadada',
    color: '#dadada',
    fontSize: 18,
    opacity: 0.6,
    flex: 1,
  },
  mock_label_title: {
    backgroundColor: '#b5c3d3',
    textAlign: 'right',
    color: '#b5c3d3',
    marginRight: 10,
    opacity: 0.6,
    fontSize: 18,
    width: 150,
  },
  mock_listItem: {
    justifyContent: 'space-between',
    borderBottomColor: '#dadada',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 30,
    paddingRight: 30,
    paddingTop: 30,
    marginLeft: 0,
    opacity: 0.6,
    flex: 1,
  },
})
