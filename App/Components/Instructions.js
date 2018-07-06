import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/InstructionsStyle'
import { Container, Header, Title, Content, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, 
  Card, CardItem,
  Form, Item, Input,
  List, ListItem, Thumbnail, H1, Segment } from 'native-base';


export default class Instructions extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { workInstructions } = this.props
    return (
      <Card>
        {workInstructions.map((wi,i)=>(
          <CardItem bordered>
            <Body>
              <Text>{wi.WorkInstruction.Name}</Text>
              <Text>{wi.WorkInstruction.Description}</Text>
            </Body>
            {/*<Right>
                          <Icon name="md-document" />
                        </Right>*/}
          </CardItem>
        ))}
      </Card>
    )
  }
}
