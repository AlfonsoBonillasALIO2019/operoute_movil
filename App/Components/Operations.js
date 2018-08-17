import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from './Styles/OperationsStyle'
import { CheckBox, Picker } from 'native-base'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class Operations extends Component {
  state = {
    operations: [],
    picker: '',
  }

  componentDidMount = () => {
    const { requestOperators, token } = this.props
    requestOperators(token)
  }

  _keyExtractor = (item, index) => item.id

  opClick = serialId => {
    const { operations = [] } = this.state
    let newOps = operations.map(op => {
      if (op.Id === serialId) {
        return { ...op, ...{ selected: !op.selected } }
      } else {
        return op
      }
    })
    this.setState({
      operations: newOps
    })
  }

  _renderItem = ({ item }) => {
    const { operators } = this.props
    console.log({ operators })
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <Text style={styles.serial}>{item.PartPO.PartId}</Text>
          <Text style={styles.operation}>{item.PartPO.SerialNum} X</Text>
          <View style={styles.status}>
            <Picker
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.picker}
              placeholder="Seleccionar Operador"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
            // onValueChange={this.onValueChange.bind(this)}
            >
              {operators && operators.map((operator, index) => (
                <Picker.Item label={operator.Name} value={'x'} />
              ))}
            </Picker>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.operations === state.operations) {
      return state
    } else {
      return { ...state, ...{ operations: props.operations } }
    }
  }

  render() {
    const { operations = [] } = this.state
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

const mapStateToProps = (state) => {
  return {
    operators: state.workOrder.operators,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)