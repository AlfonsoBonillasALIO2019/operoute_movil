import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, TouchableHighlight } from 'react-native'
import styles from './Styles/OperationsStyle'
import { Picker, Button } from 'native-base'
import { Text } from 'native-base'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class Operations extends Component {
  state = {
    operations: [],
    picker: '',
  }

  componentDidMount = () => {
    const { requestOperators, token, requestWooperationlog, search } = this.props
    const { WOKey, RCTKey, OperationKey } = search

    requestOperators(token)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
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
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <Text style={styles.serial}>{item.PartPO.PartId}</Text>
          <Text style={styles.operation}>{item.PartPO.SerialNum}</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.picker}
            placeholder="Seleccionar Operador"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
          // onValueChange={this.onValueChange.bind(this)}
          >
            {operators &&
              operators.map((operator, index) => (
                <Picker.Item label={operator.Name} value={operator.Id} />
              ))
            }
          </Picker>
          <Picker
            mode="dropdown"
            selectedValue={this.state.picker}
            placeholder="Estado"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
          >
            <Picker.Item label={"Estado"} value={'Comenzar'} />
            <Picker.Item label={"Comenzar"} value={'Comenzar'} />
            <Picker.Item label={"Pausar"} value={'Pausar'} />
            <Picker.Item label={"Resumir"} value={'Resumir'} />
            <Picker.Item label={"Aprovar"} value={'Aprovar'} />
            <Picker.Item label={"Fallo"} value={'Fallo'} />
          </Picker>
          <Button success rounded small>
            <Text>Guardar</Text>
          </Button>
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

    const { Wooperationlog } = this.props

    console.log({ Wooperationlog })

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
    Wooperationlog: state.workOrder.Wooperationlog,
    operators: state.workOrder.operators,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token)),
    requestWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchWooperationlogRequest(token, WOKey, RCTKey, OperationKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)