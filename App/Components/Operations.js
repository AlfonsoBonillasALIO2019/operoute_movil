import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Prompt from 'react-native-prompt'
import { Picker, Button, Text, Badge } from 'native-base'
import { View, FlatList, TouchableHighlight } from 'react-native'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import styles from './Styles/OperationsStyle'

class Operations extends Component {
  state = {
    operations: [],
    operationsLog: [],

    promptSerialNum: '',

    promptDurationVisible: false,
    promptDurationIsSuccessful: false,

    promptPauseCauseVisible: false
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

    requestPostWooperationlog(token, data)
  }

  _pause = (serialNum, Pause_ReasonCode) => {
    const { search: { WOKey }, Wooperationlog, token, requestPutWooperationlog } = this.props
    const Pause_Date = moment().format()
    const match = Wooperationlog.filter(log => log.SerialNum === serialNum)[0]

    const data = {
      SerialNum: serialNum,
      Pause_ReasonCode,
      Id: match.Id,
      Paused: true,
      Pause_Date,
      WOKey
    }

    requestPutWooperationlog(token, data, match.Id)
  }

  _resume = (serialNum) => {
    const { Wooperationlog, token, requestPutWooperationlog } = this.props
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

    requestPutWooperationlog(token, data, Id)
  }

  _terminate = (serialNum, isSuccessful, promptedDuration = 0) => {
    const { Wooperationlog, token, requestPutWooperationlog } = this.props
    const match = Wooperationlog.filter(log => log.SerialNum === serialNum)[0]
    const { StartDate, EndDate: current_EndDate, Id } = match
    const new_EndDate = moment().format()
    const SuccessDate = moment().format()

    const duration = this.getMinutesBetweenDates(new_EndDate, moment(StartDate).add(7, 'hours')) + promptedDuration

    if (duration < 1) {
      this.setState({
        promptDurationIsSuccessful: isSuccessful,
        promptDurationVisible: true,
        promptSerialNum: serialNum,
      })

      return false
    }

    data = {
      OperationSuccess: isSuccessful,
      Id,
    }

    if (isSuccessful)
      data = {
        ...data,
        OperationSuccess: isSuccessful,
      }

    if (!current_EndDate)
      data = {
        ...data,
        EndDate: new_EndDate,
        Duration: duration,
      }

    requestPutWooperationlog(token, data, Id)
  }

  getMinutesBetweenDates = (startDate, endDate) => (Math.abs(new Date(startDate) - new Date(endDate))) / 60000

  postLog = (id, serialNum) => {
    const { token, requestWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
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
        this.setState({ promptPauseCauseVisible: true, promptSerialNum: serialNum })
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

    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
  }

  renderDurationPrompt = () => {
    const { promptSerialNum: serialNum, promptDurationIsSuccessful } = this.state
    return (
      <Prompt
        title="Favor de introducir duración exacta"
        placeholder="Duración"
        defaultValue={0}
        textInputProps={{
          multiline: true,
          numberOfLines: 3,
        }}
        visible={this.state.promptDurationVisible}
        onCancel={() => this.setState({
          promptDurationIsSuccessful: false,
          promptDurationVisible: false,
          promptSerialNum: '',
        })}
        onSubmit={(value) => {
          if (!value || value < 1) {
            alert("Favor de introducir una duración válida.")
            return false
          }

          this._terminate(serialNum, promptDurationIsSuccessful, Number(value)) // Calls API call for Fail status

          this.setState({
            promptDurationIsSuccessful: false,
            promptDurationVisible: false,
            promptSerialNum: '',
          })

        }} />
    )
  }

  renderPauseCausePrompt = () => {
    const { promptSerialNum: serialNum } = this.state
    const { token, requestWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
    return (
      <Prompt
        title="Favor de introducir el motivo de pausa"
        placeholder="Motivo"
        defaultValue=""
        visible={this.state.promptPauseCauseVisible}
        onCancel={() => this.setState({
          promptPauseCauseVisible: false,
          promptSerialNum: '',
        })}
        onSubmit={(value) => {
          if (!value) {
            alert("Favor de introducir un motivo de pausa válido.")
            return false
          }

          this._pause(serialNum, value) // Calls API call for Pause status
          this.setState({ promptPauseCauseVisible: false, promptSerialNum: '', })
          requestWooperationlog(token, WOKey, RCTKey, OperationKey)
        }} />
    )
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
          {this.renderDurationPrompt()}
          {this.renderPauseCausePrompt()}
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
                <Picker.Item label={"- Operador -"} value={''} key={`${item.PartPO.SerialNum}_operador_dropdown`} />,
                operators.map((operator, index) => (
                  <Picker.Item label={operator.Name} value={operator.Id} key={`${item.PartPO.SerialNum}_${operator.Id}`} />
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
                <Picker.Item label={"- Estado -"} value={''} key={`${item.PartPO.SerialNum}_status_dropdown`} />,
                options.map((option, index) => (
                  <Picker.Item label={option.label} value={option.value} key={`${item.PartPO.SerialNum}_${option.value}`} />
                ))
              ]
            }
          </Picker>
          <Button success rounded small onPress={() => this.postLog(item.Id, item.PartPO.SerialNum)}>
            <Text>OK</Text>
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
    WooperationlogResponse: state.workOrder.WooperationlogResponse,
    Wooperationlog: state.workOrder.Wooperationlog,
    operators: state.workOrder.operators,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchWooperationlogRequest(token, WOKey, RCTKey, OperationKey)),
    requestPutWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.putWooperationlogRequest(token, data, Id)),
    requestPostWooperationlog: (token, data) => dispatch(WorkOrderActions.postWooperationlogRequest(token, data)),
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)