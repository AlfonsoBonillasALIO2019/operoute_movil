import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { View, Thumbnail, Container, Header, Title, Content, List, ListItem, Text } from 'native-base'
import { Images } from '../Themes'
import OrderScreen from './OrderScreen'
import styles from './Styles/DefaultBaseStyles'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class PageScreen extends Component {
  componentDidMount() {
    const { requestSelected, token } = this.props
    const {
      state: { params: { workOrderId } }
    } = this.props.navigation
    requestSelected(token, workOrderId)
  }

  _renderMockContainer() {
    const { header, mainBackgroundColor, headerTitle } = styles
    let thumb = Images.noPart

    let loading = { opacity: 0.6, flex: 1, color: '#dadada', backgroundColor: '#dadada', fontSize: 18 }
    let label = { opacity: 0.6, width: 150, color: '#b5c3d3', backgroundColor: '#b5c3d3', textAlign: 'right', marginRight: 10, fontSize: 18 }
    let listItem = { opacity: 0.6, flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 1, borderBottomColor: '#dadada' }

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
                <Text style={label}>Details</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Work Order</Text>
                <Text style={loading}>Loading</Text>
                <Text style={[label, { marginLeft: 10 }]}>Purchase Order</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Part Number</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Description</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Route Cards</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Loading</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Loading</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Loading</Text>
                <Text style={loading}>Loading</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label}>Loading</Text>
                <Text style={loading}>Loading</Text>
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
      const { WONum } = order
      const { header, mainBackgroundColor, headerTitle } = styles
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Thumbnail square size={35} source={Images.logo_topBar} />
            <Title style={headerTitle}>Work Order: {WONum.toUpperCase()}</Title>
          </Header>
          <OrderScreen {...this.props} />
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
