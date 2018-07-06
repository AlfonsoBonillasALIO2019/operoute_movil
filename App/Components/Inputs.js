import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import styles from './Styles/InputsStyle'

import { Container, Header, Title, Content, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, 
  Card, CardItem,
  Form, Item, Input,
  List, ListItem, Thumbnail, H1, Segment } from 'native-base';

export default class Inputs extends Component {
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
    const { inputs } = this.props
    return (
      <Card>
        {inputs.map((inp,index)=>(
          <CardItem bordered>
            <Body>
              <Text>{inp.Inputs.Name}</Text>
              <Item rounded>
                <Input/>
              </Item>
            </Body>
            <Right>
              <Button rounded success>
                <Icon name="md-send" />
              </Button>
            </Right>
          </CardItem>
        ))}
      </Card>
    )
  }
}
