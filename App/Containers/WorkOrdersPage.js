import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import { Root, View, Container, Header, Title, Content, Left, Right, Body, Icon, Text, Item, Input, ListItem, Thumbnail, ActionSheet } from 'native-base'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import LoginActions from '../Redux/LoginRedux'
import stylesDefault from './Styles/DefaultBaseStyles'
import stylesWorkOrders from './Styles/WorkOrdersStyles'
import { Images } from '../Themes'

class WorkOrdersPage extends Component {
  state = {
    clicked: "",
    searched: false,
    searchSerialNumber: '',
    mockData: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  componentDidMount() {
    const { workOrdersRequest, token } = this.props
    workOrdersRequest(token)

    ActionSheet.actionsheetInstance = null
  }

  filterOrders = (orders) => {
    const text = this.state.searchSerialNumber.toLowerCase().trim()
    let result = orders.filter(order => {
      if (order.RouteCard.length > 0 && order.RouteCard[0].PartInfo.Number.toString().toLowerCase().indexOf(text) > -1)
        return true
    })
    return result
  }

  _renderEmpty = () =>
    (
      <ListItem style={stylesDefault.noResultsRow} onPress={() => { }}>
        <Text style={[stylesDefault.noResultsText]}>There are no work orders.</Text>
      </ListItem>
    )

  _renderMockFlatList = () => {
    const { listItem, listItemLeft, listItemRightView, listItemRightViewIcon, listItemMockText } = stylesWorkOrders
    return (
      <FlatList
        style={{ opacity: 0.6 }}
        data={this.state.mockData}
        renderItem={({ item }) => {
          return (
            <ListItem onPress={() => { }} style={[listItem, { borderColor: '#dadada' }]}>
              <Left style={listItemLeft}>
                <Thumbnail square large source={Images.noPart} />
                <Body>
                  <Text style={[listItemMockText, { width: 100 }]} />
                  <Text style={[listItemMockText, { width: 200 }]} />
                  <Text style={[listItemMockText, { marginBottom: 0, width: 70 }]} />
                </Body>
              </Left>
              <Right>
                <View style={listItemRightView}>
                  <Icon style={listItemRightViewIcon} name="ios-arrow-forward" />
                </View>
              </Right>
            </ListItem>
          )
        }}
      />
    )
  }

  _renderWorkOrder = ({ item }) => {
    const { navigate } = this.props.navigation
    let Description = ''
    let thumb = Images.noPart
    let borderColor = "#dadada"

    try {
      Description = item.RouteCard[0].PartInfo.Description
    } catch (err) { }

    if (item.RouteCard && item.RouteCard[0] && item.RouteCard[0].Id >= 2 && item.RouteCard[0].Id <= 10) {
      const { Id } = item.RouteCard[0]
      thumb = Images.part[Id]

      if (Id >= 0 && Id <= 4)
        borderColor = '#eb5da4'

      if (Id >= 5 && Id <= 7)
        borderColor = '#6061aa'

      if (Id >= 8 && Id <= 10)
        borderColor = '#fe9200'
    }

    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView, listItemRightViewLabel, listItemRightViewDate, listItemRightViewIcon } = stylesWorkOrders

    return (
      <ListItem onPress={() => navigate('WorkOrderPage', { workOrderId: item.Id })}
        style={[listItem, { borderColor }]}>
        <Left style={listItemLeft}>
          <Thumbnail square large source={thumb} />
          <Body>
            <Text style={listItemLeftTextMain}>{item.WONum.toUpperCase()}</Text>
            <Text style={listItemLeftTextSecondary}>{Description}</Text>
          </Body>
        </Left>
        <Right>
          <View style={listItemRightView}>
            <Text style={listItemRightViewLabel}>Req. Date: </Text>
            <Text style={listItemRightViewDate}>{moment(item.ModifiedDate).format("ll")}</Text>
            <Icon style={listItemRightViewIcon} name="ios-arrow-forward" />
          </View>
        </Right>
      </ListItem>
    )
  }

  _renderWorkOrderQuickAccess = ({ item }) => {
    const { navigate } = this.props.navigation
    let Description = ''
    let thumb = Images.noPart
    let borderColor = "#dadada"

    try {
      Description = item.WorkInstructions[0].Name
    } catch (err) { }

    if (item.RouteCard && item.RouteCard[0] && item.RouteCard[0].Id >= 2 && item.RouteCard[0].Id <= 10) {
      const { Id } = item.RouteCard[0]
      thumb = Images.part[Id]

      if (Id >= 0 && Id <= 4)
        borderColor = '#eb5da4'

      if (Id >= 5 && Id <= 7)
        borderColor = '#6061aa'

      if (Id >= 8 && Id <= 10)
        borderColor = '#fe9200'
    }

    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView, listItemRightViewLabel, listItemRightViewDate, listItemRightViewIcon } = stylesWorkOrders

    return (
      <ListItem onPress={() => navigate('OperationQuickAccessPage',
        {
          card: item,
          Operation: item.Operations[0],
          serials: item.SerialNum,
          routeCardName: item.RouteCard[0].Name,
          workOrderNumber: item.WONum,
        })}
        style={[listItem, { borderColor }]}>
        <Left style={listItemLeft}>
          <Thumbnail square large source={thumb} />
          <Body>
            <Text style={listItemLeftTextMain}>{item.WONum.toUpperCase()}</Text>
            <Text style={listItemLeftTextSecondary}>{Description}</Text>
          </Body>
        </Left>
        <Right>
          <View style={listItemRightView}>
            <Text style={listItemRightViewLabel}>Req. Date: </Text>
            <Text style={listItemRightViewDate}>{moment(item.ModifiedDate).format("ll")}</Text>
            <Icon style={listItemRightViewIcon} name="ios-arrow-forward" />
          </View>
        </Right>
      </ListItem>
    )
  }

  _renderFlatList = () => {
    const { orders, ordersBySerial } = this.props
    const data = ordersBySerial.length > 0 && this.state.searched === true ? ordersBySerial : orders
    const renderItem = ordersBySerial.length > 0 && this.state.searched === true ? this._renderWorkOrderQuickAccess : this._renderWorkOrder
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={this._renderEmpty}
      />)
  }

  _renderLogOff = () => {
    const { navBackButton } = stylesDefault
    var BUTTONS = ["Log off", "CANCEL"]

    return (
      <Right>
        <Root>
          <Icon
            name='ios-log-out-outline'
            style={[navBackButton, { alignSelf: 'flex-end' }]}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: 1,
                  title: "Are you sure want to log out?"
                },
                buttonIndex => {
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                }
              )}
          />
        </Root>
      </Right>
    )
  }

  render() {
    const { header, mainBackgroundColor, headerTitle, container } = stylesWorkOrders
    const { orders, workOrdersBySerialRequest, token } = this.props
    const { searchSerialNumber, searched } = this.state

    if (this.state.clicked == "Log off") {
      const { logout } = this.props
      logout()
    }

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Orders</Title>
          {this._renderLogOff()}
        </Header>
        <Header style={mainBackgroundColor} searchBar>
          <Item style={{ borderRadius: 3, paddingLeft: 10, paddingRight: 10 }}>
            <Input
              placeholder="Type Serial Number"
              value={searchSerialNumber}
              onChangeText={(text) => this.setState({ searchSerialNumber: text })}
            />
            {
              searched === true ?
                <Icon name="md-close" onPress={() => {
                  this.setState({ searchSerialNumber: '', searched: false })
                }} />
                :
                <Icon name="ios-search" onPress={() => {
                  if (searchSerialNumber.length == 0) return false
                  workOrdersBySerialRequest(token, searchSerialNumber)
                  this.setState({ searched: true })
                }} />
            }
          </Item>
        </Header>
        <Content style={container}>
          {orders.length === 0 ? this._renderMockFlatList() : this._renderFlatList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ordersBySerial: state.workOrder.ordersBySerial,
    orders: state.workOrder.orders,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    workOrdersRequest: token => dispatch(WorkOrderActions.workOrderRequest(token)),
    workOrdersBySerialRequest: (token, serialNumber) => dispatch(WorkOrderActions.workOrderBySerialRequest(token, serialNumber)),
    logout: () => {
      dispatch(LoginActions.logoutRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrdersPage)
