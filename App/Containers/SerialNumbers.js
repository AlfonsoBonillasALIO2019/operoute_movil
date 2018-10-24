import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text, H2, ListItem } from 'native-base'
import { View, FlatList, TouchableHighlight } from 'react-native'
import styles from './Styles/SerialNumbersStyle'

class SerialNumbers extends React.PureComponent {
  pressItem = item => {
    const { navigate } = this.props.navigation
    navigate('Operation', item)
  }

  renderRow = ({ item }) => {
    const { card, serials } = this.props
    const { Operation = {} } = item

    if (!Operation.Active) console.log({ Operation })

    return (
      <ListItem
        style={styles.row}
        onPress={() => this.pressItem({ card, Operation, serials })}>
        <Text style={styles.serial}>{Operation.Id}</Text>
        <Text style={styles.operation}>{Operation.OperationNum} - {Operation.Name}</Text>
      </ListItem>
    )
  }

  renderHeader = () => (
    <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#dadada' }]}>
      <Text style={[styles.serial, { color: '#4f6987', fontWeight: '500' }]}>SERIAL</Text>
      <Text style={[styles.operation, { color: '#4f6987', fontWeight: '500' }]}>OPERATION</Text>
    </View>
  )

  renderEmpty = () =>
    (
      <ListItem
        style={styles.row}
        onPress={() => { }}>
        <Text style={[styles.operation, { textAlign: 'center' }]}>There are no operations on this serial number.</Text>
      </ListItem>
    )

  renderSeparator = () => null

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render() {
    console.log("this.props", this.props)
    let { card: { Operations, RouteCard } } = this.props
    let name = ''
    try {
      name = RouteCard[0].Name
    } catch (err) { }

    console.log({ RouteCard })

    return (
      <Container>
        <Content>
          <View style={{ backgroundColor: '#e2e2e2', width: '100%', paddingVertical: 35 }}>
            <H2 style={{ color: '#4f6987', textAlign: 'center', fontWeight: '500' }}>{name.toUpperCase()}</H2>
            <Text style={{ color: '#4f6987', textAlign: 'center', fontWeight: '400' }}>Route Card</Text>
          </View>
          <View>
            <FlatList
              data={Operations}
              ListFooterComponent={null}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderEmpty}
              ListHeaderComponent={this.renderHeader}
              initialNumToRender={this.oneScreensWorth}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerialNumbers)
