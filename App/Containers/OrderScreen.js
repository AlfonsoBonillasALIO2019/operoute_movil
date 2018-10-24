import React, { Component } from 'react'
import { Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/DefaultBaseStyles'
import { View, Container, Content, List, ListItem, Text, Icon } from 'native-base'

export default class OrderScreen extends Component {
  render() {
    const { navigate } = this.props.navigation
    const { order, order: { SerialNum = [] } } = this.props

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

    const grayLabel = { flex: 1, color: '#a0a0a0', fontWeight: '300', fontSize: 18 }
    const rCListItem = { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, paddingRight: 30, paddingTop: 30, paddingBottom: 30 }
    const listItem = { ...rCListItem, borderBottomWidth: 1, borderBottomColor: '#dadada' }
    const purpleLabel = { width: 150, color: '#4f6987', textAlign: 'right', marginRight: 10, fontSize: 18 }
    const mainLabel = { width: 150, color: '#4f6987', textAlign: 'right', fontWeight: '500', fontSize: 18 }
    const viewHeader = { backgroundColor: '#e2e2e2', width: '100%', height: 400 }

    return (
      <Container>
        <Content>
          <View style={viewHeader}>
            <Image resizeMode="contain" source={thumb} style={{ height: 300, width: null, flex: 1 }} />
          </View>
          <View style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10 }}>
            <List>
              <ListItem style={listItem}>
                <Text style={mainLabel}>DETAILS</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={purpleLabel}>Work Order</Text>
                <Text style={[grayLabel, { marginRight: 10 }]}>{WONum.toUpperCase()}</Text>
                <Text style={purpleLabel}>Purchase Order</Text>
                <Text style={grayLabel}>{PurchaseOrder.toUpperCase()}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={purpleLabel}>Part Number</Text>
                <Text style={grayLabel}>{partNumber.toUpperCase()}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={purpleLabel}>Description</Text>
                <Text style={grayLabel}>{Description}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={mainLabel}>ROUTE CARDS</Text>
              </ListItem>
              {order.Routecards.map((card, i) => {
                return card.RouteCard.map((_routeCard, j) => {
                  return (
                    <ListItem onPress={() => navigate('SerialNumbersPage', { card: { ...card }, serials: { ...SerialNum }, ...this.props, })} style={rCListItem}>
                      <Text style={purpleLabel}>{i + 1}. </Text>
                      <Text style={grayLabel}>{_routeCard.Name.toUpperCase()}</Text>
                      <Icon style={{ color: '#dadada' }} name="ios-arrow-forward" />
                    </ListItem>
                  )
                })
              })}
            </List>
          </View>
        </Content>
      </Container>
    )
  }
}
