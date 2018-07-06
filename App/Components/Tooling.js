import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native'
import styles from './Styles/ToolingStyle'

import { Container, Header, Title, Content, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, 
  Card, CardItem,
  Form, Item, Input,
  List, ListItem, Thumbnail, H1, Segment } from 'native-base';


export default class Tooling extends Component {
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
    return (
      <Card>
        <FlatList
          data={this.props.toolFixtures}
          numColumns={2}
          horizontal={false}
          renderItem={({item}) => (
            
            <CardItem bordered style={styles.row}>
              <Body>
                <Text>{item.ToolFixture.Description}</Text>
                <Text note>{item.ToolFixture.TFNum}</Text>
              </Body>
            </CardItem>
          )}
        />
      </Card>
    )
  }
}
