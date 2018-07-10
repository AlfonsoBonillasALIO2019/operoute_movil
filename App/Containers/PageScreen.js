import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PageScreenStyle'

import OrderScreen from './OrderScreen'
import SerialNumbers from './SerialNumbers'

import { Pages } from 'react-native-pages'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class PageScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount () {
    const { requestSelected, token } = this.props
    const { 
      navigate, 
      state:{ params:{ workOrderId } } 
    } = this.props.navigation
    requestSelected(token, workOrderId)
  }

  render () {
    const { order } = this.props
    if (order === null) {
      return <Text>Loading...</Text>
    }else {
      const { Routecards=[], SerialNum=[] } = order
      return (
        <Pages>
          <OrderScreen style={{ flex: 1 }} {...this.props} />
          {Routecards.map((card,index)=>(
              <SerialNumbers style={{ flex: 1 }} card={card} serials={SerialNum} {...this.props} />
            )
          )}
        </Pages>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order:state.workOrder.selectedOrder,
    token:state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSelected:(token, workOrderId)=>dispatch(WorkOrderActions.workOrderByIdRequest(token, workOrderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageScreen)
