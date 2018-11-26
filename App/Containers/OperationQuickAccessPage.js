import React, { Component } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Title, Content, Button, Text, H2, H3, Icon } from 'native-base'
import Operations from '../Components/Operations'
import stylesDefault from './Styles/DefaultBaseStyles'

class OperationQuickAccessPage extends Component {
  state = {
  }

  render() {
    const {
      goBack, state: { params: { card, Operation, serials, routeCardName, workOrderNumber } }
    } = this.props.navigation
    const { Description } = Operation
    let serialsTemp = []
    const optionButton = {
      flex: 1,
      elevation: 0,
      paddingTop: 35,
      borderRadius: 0,
      paddingBottom: 35,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 5
    }

    serials.map((serial, index) => (
      serialsTemp.push({ ...serial, PartPO: { ...serial.PartPO[0] } })
    ))

    const { header, mainBackgroundColor, headerTitle, subHeader, subHeader_title, subHeader_subtitle, subHeader_text, navBackButton } = stylesDefault
    let currentPage = <Operations operations={serialsTemp} passOffReqd={Operation.PassOffReqd} search={{ WOKey: card.Id, RCTKey: card.RCTKey, OperationKey: Operation.Id }} />

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
          <Title style={headerTitle}>Work Order: {workOrderNumber.toUpperCase()} / Route Card: {routeCardName.toUpperCase()}</Title>
        </Header>
        <Content>
          <View style={subHeader}>
            <H2 style={subHeader_title}>{Operation.OperationNum} - {Operation.Name}</H2>
            <H3 style={subHeader_subtitle}>{Description}</H3>
            <Text style={subHeader_text}>{moment(card.ModifiedDate).format("ll")}</Text>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginBottom: 5 }}>
            <Button
              style={[optionButton, { borderBottomColor: '#6986a7' }]}
              onPress={() => {}}>
              <Text style={{ color: '#828282', fontWeight: '500' }}>OPERATIONS ({serialsTemp.length})</Text>
            </Button>
          </View>
          {currentPage}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => { return {} }

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(OperationQuickAccessPage)
