import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexedColumn: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#4f6987'
  },
  logo: {
    height: 120
  },
  innerBox: {
    width: 450,
    marginTop: 60,
    paddingTop: 45,
    borderRadius: 50,
    paddingBottom: 35,
    paddingHorizontal: 40,
    backgroundColor: '#f6f6f6',
  },
  username: {
    marginLeft: 0,
    marginBottom: 20
  },
  password: {
    marginLeft: 0,
    marginBottom: 35
  },
  button: {
    width: 200,
    height: 50,
    elevation: 0,
    backgroundColor: '#66afa3',
  },
  buttonText: {
    color: '#f6f6f6'
  }
})
