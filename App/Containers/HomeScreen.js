import React, { Component } from 'react'
import { ScrollView, Image, View, FlatList } from 'react-native'
import { Images } from '../Themes'
import {
  Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text,
  Card, CardItem,
  Form, Item, Input,
  List, ListItem, Thumbnail, H1
} from 'native-base';
import { connect } from 'react-redux'
import moment from 'moment'
// Styles
import styles from './Styles/LaunchScreenStyles'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class HomeScreen extends Component {
  componentDidMount() {
    const { request, token } = this.props
    request(token)
  }
  render() {
    const { navigate } = this.props.navigation
    const { orders, token, user: { FirstName, LastName } = {} } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Thumbnail square size={50} source={Images.launch} />
          </Left>
          <Body>
            <Title>Work Orders</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H1>Welcome {`${FirstName} ${LastName}`}</H1>
          <FlatList
            data={orders}
            renderItem={({ item }) => {
              let Description = ''
              try {
                Description = item.RouteCard[0].PartInfo.Description
              } catch (err) { }

              return (
                <ListItem
                  onPress={() =>
                    navigate('Modal', { workOrderId: item.Id })
                  }>
                  <Left>
                    <Thumbnail square size={80} source={Images.clearLogo} />
                    <Body>
                      <Text>{item.WONum}</Text>
                      <Text note>{Description}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text>{moment(item.ModifiedDate).format("ll")}</Text>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )
            }
            }
          />
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
