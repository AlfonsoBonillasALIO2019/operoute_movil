import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Text, ListItem, Left, Body } from 'native-base'
import stylesWorkOrders from '../Containers/Styles/WorkOrdersStyles'
import styles from './Styles/OperationsStyle'

export default class Tooling extends Component {

  _keyExtractor = (item, index) => item.ToolFixture.Id.toString()

  _renderItem = ({ item }) => {
    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView } = stylesWorkOrders
    const { ToolFixture: { TFNum, Description } } = item

    return (
      <ListItem style={[listItem, { borderLeftWidth: 0 }]}>
        <Left style={listItemLeft}>
          <Body>
            <Text style={listItemLeftTextMain}>{Description}</Text>
            <Text style={listItemLeftTextSecondary}>{TFNum}</Text>
          </Body>
        </Left>
      </ListItem>
    )
  }

  render() {
    const { toolFixtures } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={toolFixtures}
          extraData={[]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
