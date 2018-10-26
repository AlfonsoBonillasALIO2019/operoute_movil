import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text, H2, ListItem, Thumbnail, Header, Title, Icon } from 'native-base'
import { View, FlatList } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/SerialNumbersStyle'
import stylesDefault from './Styles/DefaultBaseStyles'

class SerialNumbers extends React.PureComponent {
  pressItem = item => {
    const { navigate } = this.props.navigation
    navigate('Operation', item)
  }

  renderRow = ({ item }) => {
    const { navigation: { state: { params: { card, serials, card: { RouteCard }, order: { WONum } } } } } = this.props
    const { Operation = {} } = item
    let name = ''
    try {
      name = RouteCard[0].Name
    } catch (err) { }

    return (
      <ListItem style={styles.row} onPress={() => this.pressItem({ card, Operation, serials, routeCardName: name, workOrderNumber: WONum })}>
        <Text style={styles.serial}>{Operation.Id}</Text>
        <Text style={styles.operation}>{Operation.OperationNum} - {Operation.Name}</Text>
        <Icon style={{ color: '#dadada' }} name="ios-arrow-forward" />
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
      <ListItem style={styles.row} onPress={() => { }}>
        <Text style={[styles.operation, { textAlign: 'center' }]}>There are no operations on this serial number.</Text>
      </ListItem>
    )

  keyExtractor = (item, index) => index

  render() {
    const { navigation: { state: { params: { card: { Operations, RouteCard }, order: { WONum } } } } } = this.props
    const oneScreensWorth = 20
    let name = ''
    try {
      name = RouteCard[0].Name
    } catch (err) { }

    const { header, subHeader, subHeader_title, subHeader_text, mainBackgroundColor, headerTitle } = stylesDefault

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Order: {WONum.toUpperCase()}</Title>
        </Header>
        <Content>
          <View style={subHeader}>
            <H2 style={subHeader_title}>{name.toUpperCase()}</H2>
            <Text style={subHeader_text}>Route Card</Text>
          </View>
          <View>
            <FlatList
              data={Operations}
              ListFooterComponent={null}
              renderItem={this.renderRow}
              ItemSeparatorComponent={null}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderEmpty}
              ListHeaderComponent={this.renderHeader}
              initialNumToRender={oneScreensWorth}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => { return {} }
const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(SerialNumbers)
