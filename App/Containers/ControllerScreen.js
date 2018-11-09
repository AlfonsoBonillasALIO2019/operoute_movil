import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import LaunchScreen from './LaunchScreen'

class ControllerScreen extends Component {
  render() {
    let { user } = this.props
    let controller = null

    if (user === null) controller = <LaunchScreen />
    else controller = <ReduxNavigation />

    return controller
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    token: state.login.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerScreen)
