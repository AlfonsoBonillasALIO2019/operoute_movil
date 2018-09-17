import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import { View, Container, Header, Title, Content, Left, Right, Body, Icon, Text, Item, Input, ListItem, Thumbnail, H3 } from 'native-base'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import styles from './Styles/HomeScreenStyles'
import { Images } from '../Themes'

class HomeScreen extends Component {
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
      for (let prop in order) {
        if (JSON.stringify(order[prop]).toString().toLowerCase().indexOf(text) > -1)
          return true
      }
    })

    return result
  }

  _renderMockFlatList = () => {
    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView, listItemRightViewIcon } = styles
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
                  <Text style={{ height: 10, width: 100, backgroundColor: '#dadada', marginBottom: 5 }} />
                  <Text style={{ height: 10, width: 200, backgroundColor: '#dadada', marginBottom: 5 }} />
                  <Text style={{ height: 10, width: 70, backgroundColor: '#dadada' }} />
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

  _renderFlatList = () => {
    const { orders } = this.props
    return (
      <FlatList
        data={!this.state.searchText ? orders : this.filterOrders(orders)}
        renderItem={this._renderWorkOrder}
      />)
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

    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView, listItemRightViewLabel, listItemRightViewDate, listItemRightViewIcon } = styles

    return (
      <ListItem onPress={() => navigate('Modal', { workOrderId: item.Id })}
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

  render() {
    const { orders, user: { FirstName } = {} } = this.props
    const { header, mainBackgroundColor, headerTitle, container } = styles

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Orders</Title>
        </Header>
        <Header style={mainBackgroundColor} searchBar>
          <Item style={{ borderRadius: 5 }}>
            <Icon name="ios-search" />
            <Input onChangeText={(text) => this.setState({ searchText: text })} placeholder="Buscar..." />
          </Item>
        </Header>
        <Content style={container}>
          {/* <H3 style={{ color: '#4f6987', marginLeft: 10, marginTop: 30, marginBottom: 25, fontWeight: "400" }}>
            Welcome {FirstName}
          </H3> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
