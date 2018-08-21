import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Images } from '../Themes'
import {
  Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text,
  Card, CardItem,
  Form, Item, Input,
  List, ListItem, Thumbnail, H1, Segment
} from 'native-base';

import { connect } from 'react-redux'
import WorkOrderActions from '../Redux/WorkOrderRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
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
      state: { params: { card, Operation, serials } }
    } = this.props.navigation

    let Description

    try {
      Description = card.RouteCard[0].PartInfo.Description
    } catch (err) { }

    // alert(JSON.stringify(Operation))
    const workInstructions = card.WorkInstructions.filter(wi => wi.OperationKey === Operation.Id)
    const toolFixtures = card.ToolFixtures.filter(tf => tf.OperationTFC.OperationKey === Operation.Id)
    const inputs = card.Inputs.filter(inp => inp.OperationKey === Operation.Id)


    let screen = null
    if (selected === 'INSTRUCTIONS') {
      screen = <Instructions workInstructions={workInstructions} />
    } else if (selected === 'INPUTS') {
      screen = <Inputs inputs={inputs} />
    } else if (selected === 'TOOLING') {
      screen = <Tooling toolFixtures={toolFixtures} />
    } else if (selected === 'OPERATIONS') {
      screen = <Operations operations={serials} search={{ WOKey: card.WOKey, RCTKey: card.Operations[0].RCTKey, OperationKey: Operation.Id }} />
    }
    return (
      <Container>
        <Header>
          <Left>
            <Thumbnail square size={50} source={Images.launch} />
          </Left>
          <Body>
            <Title>{Operation.Name}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.serialView}>
            <Text style={styles.serialLabel}>Detalle de la Operación </Text>
            <Text style={styles.serial}>{Description}</Text>
            <Text style={styles.date}>{moment(card.ModifiedDate).format("ll")}</Text>
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
