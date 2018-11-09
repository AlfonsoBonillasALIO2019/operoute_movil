import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import { View, Container, Header, Title, Content, Left, Right, Body, Icon, Text, Item, Input, ListItem, Thumbnail } from 'native-base'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import stylesDefault from './Styles/DefaultBaseStyles'
import stylesWorkOrders from './Styles/WorkOrdersStyles'
import { Images } from '../Themes'

class WorkOrdersPage extends Component {
  state = {
    searchText: '',
    mockData: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  componentDidMount() {
    const { request, token } = this.props
    request(token)
  }

  filterOrders = (orders) => {
    const text = this.state.searchText.toLowerCase().trim()
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

  _renderFlatList = () => {
    const { orders } = this.props
    return (
      <FlatList
        data={!this.state.searchText ? orders : this.filterOrders(orders)}
        renderItem={this._renderWorkOrder}
        ListEmptyComponent={this._renderEmpty}
      />)
  }

  render() {
    const { header, mainBackgroundColor, headerTitle, container } = stylesWorkOrders
    const { orders } = this.props

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Orders</Title>
        </Header>
        <Header style={mainBackgroundColor} searchBar>
          <Item style={{ borderRadius: 3, paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 0 }}>
            <Input onChangeText={(text) => this.setState({ searchText: text })} placeholder="Type Serial Number" />
            <Icon name="ios-search" onPress={() => console.log("CLICKED SEARCH")} />
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
    orders: state.workOrder.orders,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    request: token => dispatch(WorkOrderActions.workOrderRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrdersPage)
