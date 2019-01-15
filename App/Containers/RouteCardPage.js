import React from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text, H2, ListItem, Header, Title, Icon } from 'native-base'
import { View, FlatList } from 'react-native'
import stylesRouteCard from './Styles/RouteCardStyles'
import stylesDefault from './Styles/DefaultBaseStyles'

class RouteCardPage extends React.PureComponent {
  renderRow = ({ item }) => {
    const { navigation: { navigate, state: { params: { card, serials, card: { RouteCard }, order: { WONum } } } } } = this.props
    const { Operation = {} } = item
    let name = ''
    try {
      name = RouteCard[0].Name
    } catch (err) { }

    const { row, operation } = stylesRouteCard
    const { color_light_gray } = stylesDefault

    return (
      <ListItem style={row} onPress={() => navigate('OperationPage', { card, Operation, serials, routeCardName: name, workOrderNumber: WONum })}>
        <Text style={operation}>{Operation.OperationNum} - {Operation.Name}</Text>
        <Icon style={color_light_gray} name="ios-arrow-forward" />
      </ListItem >
    )
  }

  renderHeader = () => {
    return null
  }

  renderEmpty = () =>
    (
      <ListItem style={stylesRouteCard.row} onPress={() => { }}>
        <Text style={[stylesRouteCard.operation, { textAlign: 'center' }]}>There are no operations on this serial number.</Text>
      </ListItem>
    )

  keyExtractor = (item, index) => index

  render() {
    const { navigation: { goBack, state: { params: { card: { Operations, RouteCard }, order: { WONum } } } } } = this.props
    const oneScreensWorth = 20
    let name = ''
    try {
      name = RouteCard[0].Name
    } catch (err) { }

    const { header, subHeader, subHeader_title, subHeader_text, mainBackgroundColor, headerTitle, navBackButton } = stylesDefault

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          {/* <Thumbnail square size={35} source={Images.logo_topBar} /> */}
          <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
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
              contentContainerStyle={stylesRouteCard.listContent}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => { return {} }
const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(RouteCardPage)
