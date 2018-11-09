import { Image } from 'react-native'
import React, { Component } from 'react'
import { View, Container, Content, List, ListItem, Text, Icon } from 'native-base'
import stylesDefault from '../Containers/Styles/DefaultBaseStyles'
import stylesOrder from '../Containers/Styles/WorkOrderStyles'
import { Images } from '../Themes'

export default class WorkOrder extends Component {
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

    const { label, rCListItem, label_gray } = stylesOrder
    const { color_light_gray, view_main, view_main_thumb } = stylesDefault

    const listItem = [rCListItem, { borderBottomWidth: 1, borderBottomColor: '#dadada' }]
    const label_name = [label, { marginRight: 10 }]
    const label_title = [label, { fontWeight: '500' }]

    return (
      <Container>
        <Content>
          <View style={view_main}>
            <Image resizeMode="contain" source={thumb} style={view_main_thumb} />
          </View>
          <View style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10 }}>
            <List>
              <ListItem style={listItem}>
                <Text style={label_title}>DETAILS</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label_name}>Work Order</Text>
                <Text style={[label_gray, { marginRight: 10 }]}>{WONum.toUpperCase()}</Text>
                <Text style={label_name}>Purchase Order</Text>
                <Text style={label_gray}>{PurchaseOrder.toUpperCase()}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label_name}>Part Number</Text>
                <Text style={label_gray}>{partNumber.toUpperCase()}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label_name}>Description</Text>
                <Text style={label_gray}>{Description}</Text>
              </ListItem>
              <ListItem style={listItem}>
                <Text style={label_title}>ROUTE CARDS</Text>
              </ListItem>
              {order.Routecards.map((card, i) => {
                return card.RouteCard.map((_routeCard, j) => {
                  return (
                    <ListItem onPress={() => navigate('RouteCardPage', { card: { ...card }, serials: SerialNum, ...this.props, })} style={rCListItem}>
                      <Text style={label_name}>{i + 1}. </Text>
                      <Text style={label_gray}>{_routeCard.Name.toUpperCase()}</Text>
                      <Icon style={color_light_gray} name="ios-arrow-forward" />
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
