import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Pages } from 'react-native-pages'
import { Images } from '../Themes'
import {
  View, Thumbnail, Container, Header, Title, Content, Footer, Button,
  Text, Left, Right, Body, Icon, List, ListItem, H3
} from 'native-base'
import styles from './Styles/DefaultBaseStyles'
import OrderScreen from './OrderScreen'
import SerialNumbers from './SerialNumbers'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class PageScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    const { requestSelected, token } = this.props
    const {
      navigate,
      state: { params: { workOrderId } }
    } = this.props.navigation
    requestSelected(token, workOrderId)
  }

  _renderMockContainer() {
    const { header, mainBackgroundColor, headerTitle } = styles
    let thumb = Images.noPart

    let loading = { flex: 1, color: '#dadada', backgroundColor: '#dadada' }
    let label = { width: 150, color: '#b5c3d3', backgroundColor: '#b5c3d3', textAlign: 'right', marginRight: 10 }
    let listItem = { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 1, borderBottomColor: '#dadada' }

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Order: Loading</Title>
        </Header>
        <Content>
          <View style={{ backgroundColor: '#e2e2e2', width: '100%', height: 400 }}>
            <Image resizeMode="contain" source={thumb} style={{ height: 300, width: null, flex: 1 }} />
          </View>
          <View style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10 }}>
            <List>
              <ListItem style={listItem}>
                <H3 style={label}>Details</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Work Order</H3>
                <H3 style={loading}>Loading</H3>
                <H3 style={[label, { marginLeft: 10 }]}>Purchase Order</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Part Number</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Description</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Route Cards</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Loading</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Loading</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Loading</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
              <ListItem style={listItem}>
                <H3 style={label}>Loading</H3>
                <H3 style={loading}>Loading</H3>
              </ListItem>
            </List>
          </View>
        </Content>
      </Container>
    )
  }

  render() {
    const { order } = this.props

    if (order === null)
      return this._renderMockContainer()
    else {
      const { Routecards = [], SerialNum = [], WONum } = order
      const { header, mainBackgroundColor, headerTitle } = styles
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Thumbnail square size={35} source={Images.logo_topBar} />
            <Title style={headerTitle}>Work Order: {WONum.toUpperCase()}</Title>
          </Header>
          <OrderScreen style={{ flex: 1 }} {...this.props} />
          {/* {Routecards.map((card, index) => (
              <SerialNumbers key={`serial_number_${index}`} style={{ flex: 1 }} card={card} serials={SerialNum} {...this.props} />
            )
            )} */}
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.workOrder.selectedOrder,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSelected: (token, workOrderId) => dispatch(WorkOrderActions.workOrderByIdRequest(token, workOrderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageScreen)
