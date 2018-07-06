import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from './Styles/OperationsStyle'

export default class Operations extends Component {
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
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    
      <TouchableHighlight>
        <View style={styles.row}>
          <Text style={styles.serial}>asd</Text>
          <Text style={styles.operation}>asd</Text>
          <View style={styles.status}>
            <View style={styles.circle} />
            <Text style={styles.status_text}>asd</Text>
          </View>
        </View>
      </TouchableHighlight>
  );

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.operations}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
