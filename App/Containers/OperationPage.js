import React, { Component } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Title, Content, Button, Text, H2, H3, Icon } from 'native-base'
import Inputs from '../Components/Inputs'
import Tooling from '../Components/Tooling'
import Operations from '../Components/Operations'
import Instructions from '../Components/Instructions'
import stylesDefault from './Styles/DefaultBaseStyles'

class OperationPage extends Component {
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
    const {
      goBack, state: { params: { card, Operation, serials, routeCardName, workOrderNumber } },
      navigate,
    } = this.props.navigation

    let { selected, screens } = this.state
    let Description
    let currentPage = null

    try {
      Description = card.RouteCard[0].PartInfo.Description
    } catch (err) { }

    const workInstructions = card.WorkInstructions.filter(wi => wi.OperationKey === Operation.Id)
    const toolFixtures = card.ToolFixtures.filter(tf => tf.OperationTFC.OperationKey === Operation.Id)
    const inputs = card.Inputs.filter(inp => inp.OperationKey === Operation.Id)
    const { header, mainBackgroundColor, headerTitle, subHeader, subHeader_title, subHeader_subtitle, subHeader_text, navBackButton } = stylesDefault
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

    switch (selected) {
      case 'INSTRUCTIONS': {
        currentPage = <Instructions workInstructions={workInstructions} navigation={{ ...this.props.navigation }} />
        break
      }
      case 'INPUTS': {
        currentPage = <Inputs inputs={inputs} />
        break
      }
      case 'TOOLING': {
        currentPage = <Tooling toolFixtures={toolFixtures} />
        break
      }
      default: {
        currentPage = <Operations operations={serials} passOffReqd={Operation.PassOffReqd} search={{ WOKey: card.WOKey, RCTKey: card.Operations[0].RCTKey, OperationKey: Operation.Id }} />
        break
      }
    }

    const counters = [
      serials.length,
      workInstructions.length,
      inputs.length,
      toolFixtures.length,
    ]

    return (
      <Container>
        <Header style={[header, mainBackgroundColor]}>
          <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
          {/* <Thumbnail square size={35} source={Images.logo_topBar} /> */}
          <Title style={headerTitle}>Work Order: {workOrderNumber.toUpperCase()} / Route Card: {routeCardName.toUpperCase()}</Title>
        </Header>
        <Content>
          <View style={subHeader}>
            <H2 style={subHeader_title}>{Operation.OperationNum} - {Operation.Name}</H2>
            <H3 style={subHeader_subtitle}>{Description}</H3>
            <Text style={subHeader_text}>{moment(card.ModifiedDate).format("ll")}</Text>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginBottom: 5 }}>
            {screens.map((i, k) => {
              return (
                <Button
                  style={[optionButton, { borderBottomColor: i === selected ? '#6986a7' : '#b4c2d3' }]}
                  key={'butons-' + k}
                  onPress={() => this.setState({ selected: i })}>
                  <Text style={{ color: '#828282', fontWeight: '500' }}>{i} ({counters[k]})</Text>
                </Button>
              )
            })}
          </View>
          {currentPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(OperationPage)
