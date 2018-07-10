import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from './Styles/OperationsStyle'
import { CheckBox } from 'native-base';

export default class Operations extends Component {
  state = {
    operations:[]
  }
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

  opClick = serialId => {
    const { operations=[] } = this.state
    let newOps = operations.map(op=>{
      if (op.Id === serialId) {
        return {...op,...{selected:!op.selected}}
      }else{
        return op
      }
    })
    this.setState({
      operations:newOps
    })
  }

  _renderItem = ({item}) => (
    
      <TouchableHighlight onPress={()=>this.opClick(item.Id)}>
        <View style={styles.row}>
          <Text style={styles.serial}>{item.PartPO.PartId}</Text>
          <Text style={styles.operation}>{item.PartPO.SerialNum}</Text>
          <View style={styles.status}>
            <CheckBox checked={item.selected === true} />
          </View>
        </View>
      </TouchableHighlight>
  );
  static getDerivedStateFromProps(props, state){
    if (props.operations === state.operations) {
      return state
    }else{
      return {...state,...{operations:props.operations}}
    }
  }
  render () {
    const { operations=[] } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={operations}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
