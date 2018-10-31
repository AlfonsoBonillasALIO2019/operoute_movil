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
  listItem: {
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    padding: 15,
    paddingTop: 15,
    elevation: 1,
    borderLeftWidth: 8,
    borderBottomWidth: 0,
  },
  listItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  listItemLeftTextMain: {
    color: '#4f6987',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  listItemLeftTextSecondary: {
    color: '#a0a0a0',
    fontWeight: '300',
    fontSize: 14
  },
  listItemRightView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  listItemRightViewLabel: {
    color: '#4f6987',
    fontSize: 14
  },
  listItemRightViewDate: {
    color: '#a0a0a0',
    fontSize: 14
  },
  listItemRightViewIcon: {
    color: '#dadada',
    marginLeft: 20
  },
  listItemButtonMore: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: '#eeeeee',
    borderRadius: 20,
    borderWidth: 1,
    elevation: 0,
    height: 40,
    width: 40,
  },
  listItemMockText: {
    backgroundColor: '#dadada',
    marginBottom: 5,
    height: 10,
  }
})
