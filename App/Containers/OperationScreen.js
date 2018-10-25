import React, { Component } from 'react'
import { View } from 'react-native'
import { Images } from '../Themes'
import {
  Container, Header, Title, Content, Button, Text, H2, H3,
  List, ListItem, Thumbnail
} from 'native-base'
import { connect } from 'react-redux'
import stylesDefault from './Styles/DefaultBaseStyles'
import styles from './Styles/OperationScreenStyle'
import Instructions from '../Components/Instructions'
import Tooling from '../Components/Tooling'
import Inputs from '../Components/Inputs'
import Operations from '../Components/Operations'
import moment from 'moment'

class OperationScreen extends Component {
  state = {
    selected: 'OPERATIONS',
    screens: [
      'OPERATIONS',
      'INSTRUCTIONS',
      'INPUTS',
      'TOOLING',
    ]
  }

  render() {
    let { selected, screens } = this.state

    const {
      navigate,
      state: { params: { card, Operation, serials, routeCardName, workOrderNumber } }
    } = this.props.navigation

    let Description

    try {
      Description = card.RouteCard[0].PartInfo.Description
    } catch (err) { }

    const workInstructions = card.WorkInstructions.filter(wi => wi.OperationKey === Operation.Id)
    const toolFixtures = card.ToolFixtures.filter(tf => tf.OperationTFC.OperationKey === Operation.Id)
    const inputs = card.Inputs.filter(inp => inp.OperationKey === Operation.Id)

    const { header, mainBackgroundColor, headerTitle } = stylesDefault

    const optionButton = {
      flex: 1,
      elevation: 0,
      paddingTop: 35,
      borderRadius: 0,
      paddingBottom: 35,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#4F6987',
    }

    let screen = null
    if (selected === 'INSTRUCTIONS') {
      screen = <Instructions workInstructions={workInstructions} />
    } else if (selected === 'INPUTS') {
      screen = <Inputs inputs={inputs} />
    } else if (selected === 'TOOLING') {
      screen = <Tooling toolFixtures={toolFixtures} />
    } else if (selected === 'OPERATIONS') {
      screen = <Operations operations={serials} passOffReqd={Operation.PassOffReqd} search={{ WOKey: card.WOKey, RCTKey: card.Operations[0].RCTKey, OperationKey: Operation.Id }} />
    }
    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Thumbnail square size={35} source={Images.logo_topBar} />
          <Title style={headerTitle}>Work Order: {workOrderNumber.toUpperCase()} / Route Card: {routeCardName.toUpperCase()}</Title>
        </Header>
        <Content>
          <View style={{ backgroundColor: '#E2E2E2', width: '100%', paddingVertical: 35 }}>
            <H2 style={{ color: '#4F6987', textAlign: 'center', fontWeight: '500' }}>{Operation.Name}</H2>
            <H3 style={{ color: '#4F6987', textAlign: 'center', fontWeight: '400', marginTop: 10 }}>{Description}</H3>
            <Text style={{ color: '#828282', textAlign: 'center', fontWeight: '400', marginTop: 5 }}>{moment(card.ModifiedDate).format("ll")}</Text>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
            {screens.map((i, k) => (
              <Button
                style={[optionButton, { borderBottomWidth: i === selected ? 3 : 0 }]}
                key={'butons-' + k}
                onPress={() => this.setState({ selected: i })}>
                <Text style={{ color: '#828282', fontWeight: '500' }}>{i}</Text>
              </Button>
            ))}
          </View>
          {screen}
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

export default connect(mapStateToProps, mapDispatchToProps)(OperationScreen)
