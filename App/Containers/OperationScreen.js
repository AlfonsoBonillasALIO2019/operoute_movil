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

    console.log("this.props", this.props)

    let Description

    try {
      Description = card.RouteCard[0].PartInfo.Description
    } catch (err) { }

    const workInstructions = card.WorkInstructions.filter(wi => wi.OperationKey === Operation.Id)
    const toolFixtures = card.ToolFixtures.filter(tf => tf.OperationTFC.OperationKey === Operation.Id)
    const inputs = card.Inputs.filter(inp => inp.OperationKey === Operation.Id)

    const { header, mainBackgroundColor, headerTitle } = stylesDefault

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
          <View style={{ backgroundColor: '#e2e2e2', width: '100%', paddingVertical: 35 }}>
            <H2 style={{ color: '#4f6987', textAlign: 'center', fontWeight: '500' }}>{Operation.Name}</H2>
            <H3 style={{ color: '#4f6987', textAlign: 'center', fontWeight: '400', marginTop: 10 }}>{Description}</H3>
            <Text style={{ color: '#828282', textAlign: 'center', fontWeight: '400', marginTop: 5 }}>{moment(card.ModifiedDate).format("ll")}</Text>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', margin: 10 }}>
            {screens.map((i, k) => (
              <Button rounded key={'butons-' + k}
                success={i === selected} light={i !== selected}
                onPress={() => this.setState({ selected: i })}>
                <Text>{i}</Text>
              </Button>
            ))}
          </View>
          {screen}
        </Content>
        {/* <Footer style={{backgroundColor: 'transparent', flexDirection: 'row',margin:10,height:120}}>
          <Button iconLeft rounded success style={styles.footButton}>
            <Icon name="ios-play" />
            <Text>Start</Text>
          </Button>
          <Button rounded danger style={[styles.footButton,{flex:1}]}>
            <Text>Finish</Text>
          </Button>
        </Footer> */}
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
