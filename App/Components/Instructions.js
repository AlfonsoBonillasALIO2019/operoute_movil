import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Button, Text, ListItem, Icon, Left, Right, Body } from 'native-base'
import stylesWorkOrders from '../Containers/Styles/WorkOrdersStyles'
import stylesDefault from '../Containers/Styles/DefaultBaseStyles'
import styles from './Styles/OperationsStyle'

export default class Instructions extends Component {

  _keyExtractor = (item) => item.WorkInstruction.Id.toString()

  _renderItem = ({ item }) => {
    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView } = stylesWorkOrders
    const { WorkInstruction: { DocKey, Name, Description } } = item
    const { color_light_gray } = stylesDefault
    const { navigate } = this.props.navigation

    return (
      <ListItem style={[listItem, { borderLeftWidth: 0 }]}>
        <Left style={listItemLeft}>
          <Body>
            <Text style={listItemLeftTextMain}>{Name}</Text>
            <Text style={listItemLeftTextSecondary}>{Description}</Text>
          </Body>
        </Left>
        {DocKey &&
          <Right>
            <View style={listItemRightView}>
              <Button
                onPress={() => {
                  navigate('DocumentPage', { docKey: DocKey }, ...this.props)
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  borderColor: '#eeeeee',
                  borderWidth: 1,
                  elevation: 0,
                  height: 40,
                }}
              >
                <Text style={color_light_gray}>OPEN</Text>
                <Icon style={[color_light_gray, { marginLeft: 0 }]} name="md-document" />
              </Button>
            </View>
          </Right>
        }
      </ListItem>
    )
  }

  render() {
    const { workInstructions } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={workInstructions}
          extraData={[]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}