import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { View, Container, Header, Title, Content, List, ListItem, Text, Icon } from 'native-base'
import { Images } from '../Themes'
import OrderScreen from './OrderScreen'
import styles from './Styles/DefaultBaseStyles'
import stylesOrderScreen from './Styles/OrderScreenStyle'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class PageScreen extends Component {
  componentDidMount() {
    const { requestSelected, token } = this.props
    const {
      state: { params: { workOrderId } }
    } = this.props.navigation
    requestSelected(token, workOrderId)
  }

  _renderMockContainer() {
    const { header, mainBackgroundColor, headerTitle, navBackButton, view_main, view_main_thumb } = styles
    const { mock_label_value, mock_label_title, mock_listItem } = stylesOrderScreen
    const { navigation: { goBack } } = this.props
    let thumb = Images.noPart

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
          <Title style={headerTitle}>Work Order: Loading</Title>
        </Header>
        <Content>
          <View style={view_main}>
            <Image resizeMode="contain" source={thumb} style={view_main_thumb} />
          </View>
          <View style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10 }}>
            <List>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Details</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Work Order</Text>
                <Text style={mock_label_value}>Loading</Text>
                <Text style={[mock_label_title, { marginLeft: 10 }]}>Purchase Order</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Part Number</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Description</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Route Cards</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Loading</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Loading</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Loading</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
              <ListItem style={mock_listItem}>
                <Text style={mock_label_title}>Loading</Text>
                <Text style={mock_label_value}>Loading</Text>
              </ListItem>
            </List>
          </View>
        </Content>
      </Container>
    )
  }

  render() {
    const { order, navigation: { goBack } } = this.props

    if (order === null)
      return this._renderMockContainer()
    else {
      const { WONum } = order
      const { header, mainBackgroundColor, headerTitle, navBackButton } = styles
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
            <Title style={headerTitle}>Work Order: {WONum.toUpperCase()}</Title>
          </Header>
          <OrderScreen {...this.props} />
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.workOrder.selectedOrder,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSelected: (token, workOrderId) => dispatch(WorkOrderActions.workOrderByIdRequest(token, workOrderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageScreen)
