import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Images } from '../Themes'

import {
  Container, Header, Title, Content, Footer, Button,
  Text, Left, Right, Body, Icon, List, ListItem, H3
} from 'native-base';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class OrderScreen extends Component {
  render() {
    const { navigate, state } = this.props.navigation
    const { order } = this.props

    let WONum, PurchaseOrder, Description

    try {
      WONum = order.WONum
    } catch (err) { }
    try {
      PurchaseOrder = order.PurchaseOrder.Number
    } catch (err) { }
    try {
      Description = order.Routecards[0].RouteCard[0].PartInfo.Description
    } catch (err) { }
    return (
      <Container style={{ margin: 50 }}>
        <Header>
          <Left />
          <Body>
            <Title>WO: {WONum}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Image resizeMode="contain" source={Images.launch} style={{ height: 300, width: null, flex: 1 }} />
          <List>
            <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <H3 style={{ width: 150, color: '#333' }}>Work Order</H3>
              <H3 style={{ flex: 1, color: '#999' }}>{WONum}</H3>
              <H3 style={{ width: 150, color: '#333' }}>Purchase Order</H3>
              <H3 style={{ flex: 1, color: '#999' }}>{PurchaseOrder}</H3>
            </ListItem>
            <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <H3 style={{ width: 150, color: '#333' }}>Part Number</H3>
              <H3 style={{ flex: 1, color: '#999' }}>P0001523600</H3>
            </ListItem>
            <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <H3 style={{ width: 150, color: '#333' }}>Description</H3>
              <H3 style={{ flex: 1, color: '#999' }}>{Description}</H3>
            </ListItem>
            <ListItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <H3 style={{ width: 150, color: '#333' }}>Route Cards</H3>
              <H3 style={{ flex: 1, color: '#999', backgroundColor: '#ccc', borderRadius: 10, padding: 15 }}>
                {
                  order.Routecards[0].RouteCard.map((routeCard, index) => (
                    `${routeCard.Name},`
                  ))
                }
              </H3>
            </ListItem>
          </List>
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
