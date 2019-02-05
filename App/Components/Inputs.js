import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Text, ListItem, Left, Right, Body, Item, Input, Button, Icon } from 'native-base'
import stylesWorkOrders from '../Containers/Styles/WorkOrdersStyles'
import stylesDefault from '../Containers/Styles/DefaultBaseStyles'
import styles from './Styles/OperationsStyle'

export default class Tooling extends Component {

  _keyExtractor = (item) => item.Inputs.Id.toString()

  _renderItem = ({ item }) => {
    const { listItem, listItemLeft, listItemLeftTextMain, listItemRightView } = stylesWorkOrders
    const { color_light_gray } = stylesDefault
    const { Inputs: { Name } } = item

    return (
      <ListItem style={[listItem, { borderLeftWidth: 0 }]}>
        <Left style={listItemLeft}>
          <Body>
            <Text style={listItemLeftTextMain}>{Name}</Text>
            <Item>
              <Input />
            </Item>
          </Body>
        </Left>
        <Right>
          <View style={listItemRightView}>
            <Button style={{
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              borderColor: '#eeeeee',
              borderWidth: 1,
              elevation: 0,
            }}>
              <Icon style={color_light_gray} name="md-send" />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }

  render() {
    const { inputs } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={inputs}
          extraData={[]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
