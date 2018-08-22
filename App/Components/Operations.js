import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Picker, Button, Text, Badge } from 'native-base'
import { View, FlatList, TouchableHighlight } from 'react-native'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import styles from './Styles/OperationsStyle'

class Operations extends Component {
  state = {
    operations: [],
    operationsLog: [],
  }

  componentDidMount = () => {
    const { requestOperators, token, requestWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props

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

  getLogStatusColor = (log) => {
    if (log.OperationSuccess) return '#26B99A'
    if (log.OperationSuccess === false) return '#d9534f'
    if (log.Paused) return '#f0ad4e'
    if (log.Started) return '#337ab7'

    return 'gray'
  }

  getStatusOptions = (log) => {
    // Available options
    // [
    //   { label: "Comenzar", value: 'Start' },
    //   { label: "Pausar", value: 'Pause' },
    //   { label: "Resumir", value: 'Resume' },
    //   { label: "Aprovar", value: 'Pass' },
    //   { label: "Fallo", value: 'Fail' }
    // ]

    if (log.OperationSuccess)
      return [{ label: "Fallo", value: 'Fail' }]

    if (log.OperationSuccess === false)
      return [{ label: "Aprovar", value: 'Pass' }]

    if (log.Paused)
      return [{ label: "Resumir", value: 'Resume' }]

    if (log.Started) {
      return [
        { label: "Pausar", value: 'Pause' },
        { label: "Aprovar", value: 'Pass' },
        { label: "Fallo", value: 'Fail' }
      ]
    }


    return [{ label: "Comenzar", value: 'Start' }]
  }

  _pickerOnChange = (value, item, property) => {
    let { operationsLog: tempOperationsLog } = this.state

    if (!value || !item) return false

    tempOperationsLog[item] = {
      ...tempOperationsLog[item],
      [property]: value,
    }

    this.setState({
      operationsLog: tempOperationsLog
    })
  }

  _start = (id, serialNum) => {
    const { search: { WOKey, RCTKey, OperationKey }, token, requestPostWooperationlog } = this.props
    const operationLog = this.state.operationsLog[id]
    const StartDate = moment().format()

    const data = {
      WOKey,
      RCTKey,
      SerialNum: serialNum,
      OperatorKey: operationLog.OperatorKey,
      OperationKey,
      Started: true,
      StartDate,
    }

    requestPostWooperationlog(token, data, 0)
  }

  _pause = (serialNum) => {
    const { search: { WOKey }, Wooperationlog, token, requestPostWooperationlog } = this.props
    const Pause_Date = moment().format()
    const match = Wooperationlog.filter(log => log.SerialNum === serialNum)[0]

    const data = {
      Pause_ReasonCode: 'Testing text',
      SerialNum: serialNum,
      Id: match.Id,
      Paused: true,
      Pause_Date,
      WOKey
    }

    requestPostWooperationlog(token, data, match.Id)
  }

  _resume = (serialNum) => {
    const { Wooperationlog, token, requestPostWooperationlog } = this.props
    const match = Wooperationlog.filter(log => log.SerialNum === serialNum)[0]
    const resume_date = moment().format()
    const { Pause_Date, StartDate, EndDate, Id } = match
    let { Acum_Duration } = match

    let start_date = null

    if (match.Paused === true) {
      if (!Acum_Duration)
        start_date = moment(Pause_Date)
      else
        start_date = moment(StartDate)
    } else {
      start_date = moment(EndDate)
    }

    Acum_Duration += this.getMinutesBetweenDates(start_date.add(7, 'hours'), resume_date)

    const data = {
      Paused: false,
      Acum_Duration,
      Id
    }

    requestPostWooperationlog(token, data, Id)
  }

  _terminate = (serialNum, isSuccessful) => {
    const { Wooperationlog, token, requestPostWooperationlog } = this.props
    const match = Wooperationlog.filter(log => log.SerialNum === serialNum)[0]
    const new_EndDate = moment().format()
    const SuccessDate = moment().format()
    const { StartDate, EndDate: current_EndDate, Id } = match

    const duration = this.getMinutesBetweenDates(new_EndDate, moment(StartDate).add(7, 'hours'))

    data = {
      OperationSuccess: isSuccessful,
      Id,
    }

    if (!current_EndDate) {
      data = {
        ...data,
        EndDate: new_EndDate,
        Duration: duration,
        SuccessDate,
      }
    }

    requestPostWooperationlog(token, data, Id)
  }

  getMinutesBetweenDates = (startDate, endDate) => (Math.abs(new Date(startDate) - new Date(endDate))) / 60000

  postLog = (id, serialNum) => {
    const operationLog = this.state.operationsLog[id]

    if (!operationLog || !operationLog.OperatorKey) {
      alert("Favor de seleccionar Operador y Estado")
      return false
    }

    switch (operationLog.Status) {
      case "Start": {
        this._start(id, serialNum)
        break
      }
      case "Pause": {
        this._pause(serialNum)
        break
      }
      case "Resume": {
        this._resume(serialNum)
        break
      }
      case "Pass": {
        this._terminate(serialNum, true)
        break
      }
      case "Fail": {
        this._terminate(serialNum, false)
        break
      }
    }
  }

  _renderItem = ({ item }) => {
    const { operators, Wooperationlog } = this.props

    const operation = this.state.operationsLog[item.Id]

    let status = "gray"
    let options = [{ label: "Comenzar", value: 'Start' }]

    if (Wooperationlog) {
      const match = Wooperationlog.filter(log => log.SerialNum === item.PartPO.SerialNum)

      if (match.length > 0) {
        // Get status color
        status = this.getLogStatusColor(match[0])
        // Get status dropdown menu options
        options = this.getStatusOptions(match[0])
      }
    }

    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <Badge style={{ backgroundColor: status, height: 35, width: 35, borderRadius: 17.5 }} />
          <Text style={styles.serial}>{item.PartPO.PartId}</Text>
          <Text style={styles.operation}>{item.PartPO.SerialNum}</Text>
          <Picker
            mode="dropdown"
            selectedValue={operation ? operation.OperatorKey : ''}
            placeholder="Operador"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ height: 35 }}
            onValueChange={(e) => this._pickerOnChange(e, item.Id, 'OperatorKey')}
          >
            {operators &&
              [
                <Picker.Item label={"- Operador -"} value={''} key={'operador_dropdown'} />,
                operators.map((operator, index) => (
                  <Picker.Item label={operator.Name} value={operator.Id} key={operator.Id} />
                ))
              ]
            }
          </Picker>
          <Picker
            mode="dropdown"
            selectedValue={operation ? operation.Status : ''}
            placeholder="Estado"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ height: 35 }}
            onValueChange={(e) => this._pickerOnChange(e, item.Id, 'Status')}
          >
            {
              [
                <Picker.Item label={"- Estado -"} value={''} key='status_dropdown' />,
                options.map((option, index) => (
                  <Picker.Item label={option.label} value={option.value} />
                ))
              ]
            }
          </Picker>
          <Button success rounded small onPress={() => this.postLog(item.Id, item.PartPO.SerialNum)}>
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
    WooperationlogPost: state.workOrder.WooperationlogPost,
    Wooperationlog: state.workOrder.Wooperationlog,
    operators: state.workOrder.operators,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token)),
    requestWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchWooperationlogRequest(token, WOKey, RCTKey, OperationKey)),
    requestPostWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.postWooperationlogRequest(token, data, Id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)