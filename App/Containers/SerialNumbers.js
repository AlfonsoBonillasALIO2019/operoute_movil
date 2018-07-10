import React from 'react'
import { View, FlatList, TouchableHighlight, Alert } from 'react-native'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

import { Container, Header, Title, Content, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, 
  Card, CardItem,
  Form, Item, Input, List, ListItem, H3 } from 'native-base';

// Styles
import styles from './Styles/SerialNumbersStyle'

class SerialNumbers extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
      {serial: '112201', operation: 'First Description', status:'Pending'},
    ]
  }

  pressItem = item => {
    const { navigate } = this.props.navigation
    navigate('Operation',item)
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({item}) => {
    // alert(JSON.stringify(this._onPressButton))

    const { card, serials } = this.props

    const { Operation={} } = item
    return (
      <TouchableHighlight
          onPress={() =>{
            this.pressItem({card, Operation, serials})
          }
          }>
        <View style={styles.row}>
          <Text style={styles.serial}>{Operation.OperationNum}</Text>
          <Text style={styles.operation}>{Operation.Name}</Text>
          <View style={styles.status}>
            <View style={styles.circle} />
            <Text style={styles.status_text}>{item.status}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>(
    <View style={styles.row}>
      <Text style={[styles.serial,styles.title]}>SERIAL</Text>
      <Text style={[styles.operation,styles.title]}>OPERATION</Text>
      <View style={styles.status}>
        <Text style={[styles.status_text,styles.title]}>STATUS</Text>
      </View>
    </View>
  )
    

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () => null

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    const { card:{Operations, RouteCard} } = this.props

    let Description = ''
    try {
      Description = RouteCard[0].PartInfo.Description
    }catch(err){}
    return (
      <Container style={{margin:50}}>
        <Header>
          <Left/>
          <Body>
            <Title>{Description}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={Operations}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerialNumbers)
