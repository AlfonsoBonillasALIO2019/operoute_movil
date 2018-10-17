import React, { Component } from 'react'
import { Image } from 'react-native'
import { Images } from '../Themes'
import {
  View, Thumbnail, Container, Header, Title, Content, Footer, Button,
  Text, Left, Right, Body, Icon, List, ListItem, H3
} from 'native-base'
import styles from './Styles/DefaultBaseStyles'

export default class OrderScreen extends Component {
  render() {
    const { navigate, state } = this.props.navigation
    const { order } = this.props

    const { header, mainBackgroundColor, headerTitle } = styles

    let WONum, PurchaseOrder, Description, partNumber
    let thumb = Images.noPart

    try {
      WONum = order.WONum
    } catch (err) { }
    try {
      PurchaseOrder = order.PurchaseOrder.Number
    } catch (err) { }
    try {
      Description = order.Routecards[0].RouteCard[0].PartInfo.Description
    } catch (err) { }

    if (order.Routecards[0].RouteCard && order.Routecards[0].RouteCard[0] && order.Routecards[0].RouteCard[0].Id >= 2 && order.Routecards[0].RouteCard[0].Id <= 10)
      thumb = Images.part[order.Routecards[0].RouteCard[0].Id]

    try {
      partNumber = Description = order.Routecards[0].RouteCard[0].PartInfo.Number
    } catch (err) { }

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Order: {WONum.toUpperCase()}</Title>
        </Header>
        <Content>
          <View style={{ backgroundColor: '#e2e2e2', width: '100%', height: 400 }}>
            <Image resizeMode="contain" source={thumb} style={{ height: 300, width: null, flex: 1 }} />
          </View>
          <View style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 10 }}>
            <List>
              <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dadada' }}>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', fontWeight: '500' }}>DETAILS</H3>
              </ListItem>
              <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dadada' }}>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10 }}>Work Order</H3>
                <H3 style={{ flex: 1, color: '#a0a0a0', fontWeight: '300', marginRight: 10 }}>{WONum.toUpperCase()}</H3>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10 }}>Purchase Order</H3>
                <H3 style={{ flex: 1, color: '#a0a0a0', fontWeight: '300' }}>{PurchaseOrder}</H3>
              </ListItem>
              <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dadada' }}>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10 }}>Part Number</H3>
                <H3 style={{ flex: 1, color: '#a0a0a0', fontWeight: '300' }}>{partNumber}</H3>
              </ListItem>
              <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 2, borderBottomColor: '#dadada' }}>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10 }}>Description</H3>
                <H3 style={{ flex: 1, color: '#a0a0a0', fontWeight: '300' }}>{Description}</H3>
              </ListItem>
              <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30, borderBottomWidth: 0 }}>
                <H3 style={{ width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10 }}>Route Cards</H3>
                <H3 style={{ flex: 1, color: '#a0a0a0', backgroundColor: '#dadada', borderRadius: 5, padding: 15 }}>
                  {order.Routecards[0].RouteCard.map((routeCard, index) => (
                    `${routeCard.Name},`
                  ))}
                </H3>
              </ListItem>
            </List>
          </View>
        </Content>
        <Footer style={{ backgroundColor: 'transparent' }}>
          <Right>
            <Button rounded success>
              <Icon name="arrow-forward" />
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}
