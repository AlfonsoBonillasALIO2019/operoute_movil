import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import ReduxNavigation from '../Navigation/ReduxNavigation'

import LaunchScreen from './LaunchScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ControllerScreenStyle'

class ControllerScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    let { user } = this.props
    let controller = null
    if (user === null) {
      controller = <LaunchScreen />
    }else{
      controller = <ReduxNavigation/>
    }
    return controller
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.login.user,
    token:state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerScreen)
