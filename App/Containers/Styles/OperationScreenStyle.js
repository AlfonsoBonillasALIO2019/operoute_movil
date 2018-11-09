import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
	...ApplicationStyles.screen,
	serialLabel: {
		fontSize: 20,
		fontWeight: 'normal'
	},
	serial: {
		margin: 10,
		fontWeight: 'bold',
		fontSize: 20,
		flex: 1
	},
	date: {
		fontSize: 15,
		fontWeight: '100'
	},
	serialView: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		margin: 10,
		alignItems: 'center'
	},
	footButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 3,
		margin: 10,
		height: 100
	}
})
