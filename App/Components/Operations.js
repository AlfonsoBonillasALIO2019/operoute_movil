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

    promptPauseCauseVisible: false,
    promptReworkId: 0,
    promptMatch: null,

    ReworkWooperationlog: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { ReworkWooperationlog } = state

    if (props.operations === state.operations && props.ReworkWooperationlog && ReworkWooperationlog.indexOf(props.ReworkWooperationlog[0]) > -1) {
      return state
    } else {
      if (props.ReworkWooperationlog && props.ReworkWooperationlog.length > 0) {
        ReworkWooperationlog.push(props.ReworkWooperationlog[0])
      }

      return { ...state, ...{ operations: props.operations, ReworkWooperationlog } }
    }
  }

  componentDidMount = () => {
    const { requestOperators, token, requestWooperationlog, Wooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props

    requestOperators(token)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
  }

  componentWillUnmount = () => {
    this.setState({ ReworkWooperationlog: [] })
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

  // Gets the current item log status values (label, color, options, rework and matched log)
  _getLogStatusObject = (item) => {
    const { Wooperationlog, requestReworkWooperationlog, token } = this.props
    const { ReworkWooperationlog } = this.state

    statusObj = {
      color: "gray",
      label: 'Para Comenzar',
      options: [{ label: "Comenzar", value: 'Start' }]
    }

    match = null
    isRework = false

    if (Wooperationlog) {
      // Look for match
      match = Wooperationlog.filter(log => log.SerialNum === item.PartPO.SerialNum)[0]

      // Get match status Color, Label and Options
      statusObj = this._getLogStatusValues(match)

      if (match) {
        // If the match has Rework flag to TRUE
        if (match.Rework) {
          if (!ReworkWooperationlog || ReworkWooperationlog.filter(log => log.WOOLogId === match.Id).length === 0) {
            // Request for Rework matches
            requestReworkWooperationlog(token, match.Id)
          } else if (ReworkWooperationlog) {
            // Look for match
            match = ReworkWooperationlog.filter(log => log.WOOLogId === match.Id)[0]

            if (match) {
              // Assign this id for API usage
              isRework = true
              // Get match status Color, Label and Options
              statusObj = this._getLogStatusValues(match, isRework)
            }
          }
        }
      }
    }

    return {
      statusObj,
      match,
      isRework
    }
  }

  // Gets the Label and Hex Color (strings) for the current item log status
  _getLogStatusValues = (log, isRework = false) => {
    const options = this._getLogStatusOptions(log, isRework)

    if (log.Rework) return { label: 'Para Retrabajo', color: '#EC4626', options }
    if (log.OperationSuccess) return { label: 'Aprovado', color: '#26B99A', options }
    if (log.OperationSuccess === false) return { label: 'NCR', color: '#D9534F', options }
    if (log.Paused) return { label: 'Pausado', color: '#F0AD4E', options }
    if (log.Started) return !isRework ? { label: 'Iniciado', color: '#337AB7', options } : { label: 'Retrabajando', color: '#EC4626', options }

    return !isRework ? { label: 'Para Comenzar', color: 'gray', options } : { label: 'Para Retrabajo', color: '#EC4626', options }
  }

  // Gets the available status options array for the current item log status
  _getLogStatusOptions = (log, isRework) => {
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

    if (isRework)
      return [{ label: "Reiniciar", value: 'Start' }]

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

  _start = (id, serialNum, isRework = false, match = null) => {
    const { search: { WOKey, RCTKey, OperationKey }, token, requestPostWooperationlog, requestPutReworkWooperationlog } = this.props
    const operationLog = this.state.operationsLog[id]
    const StartDate = moment().format()

    let data = {
      OperatorKey: operationLog.OperatorKey,
      Started: true,
      StartDate,
    }

    if (!isRework) {
      data = {
        ...data,
        WOKey,
        RCTKey,
        SerialNum: serialNum,
        OperationKey,
      }

      requestPostWooperationlog(token, data)
    }
    else {
      data = {
        ...data,
        Id: match.Id,
      }

      requestPutReworkWooperationlog(token, data, match.Id)
    }
  }

  _pause = (serialNum, Pause_ReasonCode, isRework, match) => {
    const { token, requestPutWooperationlog, requestPutReworkWooperationlog, requestWooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
    const Pause_Date = moment().format()

    const data = {
      SerialNum: serialNum,
      Pause_ReasonCode,
      Id: match.Id,
      Paused: true,
      Pause_Date,
      WOKey
    }

    isRework ? requestPutReworkWooperationlog(token, data, match.Id) : requestPutWooperationlog(token, data, match.Id)

    this.setState({ ReworkWooperationlog: [], promptPauseCauseVisible: false, promptSerialNum: '', promptMatch: null, promptIsRework: false })
    requestReworkWooperationlog(token, match.Id)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
  }

  _resume = (match, isRework) => {
    const { token, requestPutWooperationlog, requestPutReworkWooperationlog } = this.props

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

    isRework ? requestPutReworkWooperationlog(token, data, Id) : requestPutWooperationlog(token, data, Id)
  }

  _terminate = (isSuccessful, isRework, match, promptedDuration = 0) => {
    const { token, requestPutWooperationlog, requestPutReworkWooperationlog } = this.props
    const { StartDate, EndDate: current_EndDate, Id } = match
    const new_EndDate = moment().format()
    const SuccessDate = moment().format()

    const duration = this.getMinutesBetweenDates(new_EndDate, moment(StartDate).add(7, 'hours')) + promptedDuration

    if (duration < 1) {
      this.setState({
        promptDurationIsSuccessful: isSuccessful,
        promptDurationVisible: true,
        promptIsRework: isRework,
        promptMatch: match
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

    isRework ? requestPutReworkWooperationlog(token, data, Id) : requestPutWooperationlog(token, data, Id)

    this.setState({
      promptDurationIsSuccessful: false,
      promptDurationVisible: false,
      promptIsRework: false,
      promptMatch: null,
    })
  }

  getMinutesBetweenDates = (startDate, endDate) => (Math.abs(new Date(startDate) - new Date(endDate))) / 60000

  postLog = (id, serialNum, isRework, match = null) => {
    const { token, requestWooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
    const operationLog = this.state.operationsLog[id]

    if (!operationLog || !operationLog.OperatorKey || !operationLog.OperatorKey === 0 || operationLog.Status === 0) {
      alert("Favor de seleccionar Operador y Estado")
      return false
    }

    switch (operationLog.Status) {
      case "Start": {
        this._start(id, serialNum, isRework, match)
        break
      }
      case "Pause": {
        this.setState({ promptPauseCauseVisible: true, promptSerialNum: serialNum, promptMatch: match, promptIsRework: isRework })
        break
      }
      case "Resume": {
        this._resume(match, isRework)
        break
      }
      case "Pass": {
        this._terminate(true, isRework, match)
        break
      }
      case "Fail": {
        this._terminate(false, isRework, match)
        break
      }
    }

    this.setState({ ReworkWooperationlog: [] })

    requestReworkWooperationlog(token, match.Id)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
  }

  renderDurationPrompt = () => {
    const { promptDurationIsSuccessful, promptIsRework: isRework, promptMatch: match } = this.state
    return (
      <Prompt
        title="Favor de introducir duración exacta"
        placeholder="Duración"
        defaultValue='0'
        textInputProps={{
          multiline: false,
          numberOfLines: 1,
        }}
        visible={this.state.promptDurationVisible}
        onCancel={() => this.setState({
          promptDurationIsSuccessful: false,
          promptDurationVisible: false,
          promptIsRework: false,
          promptMatch: null,
        })}
        onSubmit={(value) => {
          if (!value || value < 1) {
            alert("Favor de introducir una duración válida.")
            return false
          }

          this._terminate(promptDurationIsSuccessful, isRework, match, Number(value)) // Calls API call for Fail status
        }} />
    )
  }

  renderPauseCausePrompt = () => {
    const { promptSerialNum: serialNum, promptMatch: match, promptIsRework: isRework } = this.state
    return (
      <Prompt
        title="Favor de introducir el motivo de pausa."
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

          this._pause(serialNum, value, isRework, match) // Calls API call for Pause status
        }} />
    )
  }

  _renderItem = ({ item }) => {
    const { operators, fetchingWooperationlog } = this.props
    const operation = this.state.operationsLog[item.Id]
    const { statusObj, match, isRework } = this._getLogStatusObject(item)

    const pickerProps = {
      mode: "dropdown",
      placeholderStyle: { color: "#bfc6ea" },
      placeholderIconColor: "#007aff",
      style: { height: 35 },
    }

    const badgeStyle = {
      backgroundColor: !fetchingWooperationlog ? statusObj.color : 'gray',
      paddingBottom: 2,
      borderRadius: 15,
      paddingTop: 2,
      height: 30,
      width: 125
    }

    return (
      <TouchableHighlight>
        <View style={styles.row}>
          {this.renderDurationPrompt()}
          {this.renderPauseCausePrompt()}
          <Badge style={badgeStyle}>
            <Text>{!fetchingWooperationlog ? statusObj.label : 'Cargando'}</Text>
          </Badge>
          <Text style={styles.serial}>{item.PartPO.PartId}</Text>
          <Text style={styles.operation}>{item.PartPO.SerialNum}</Text>
          <Picker
            {...pickerProps}
            placeholder="Operador"
            selectedValue={operation ? operation.OperatorKey : ''}
            onValueChange={(e) => this._pickerOnChange(e, item.Id, 'OperatorKey')}
          >
            {operators &&
              [
                <Picker.Item label={"- Operador -"} value='0' key={`${item.PartPO.SerialNum}_operador_dropdown`} />,
                operators.map((operator, index) => (
                  <Picker.Item label={operator.Name} value={operator.Id} key={`${item.PartPO.SerialNum}_${operator.Id}`} />
                ))
              ]
            }
          </Picker>
          <Picker
            {...pickerProps}
            placeholder="Estado"
            selectedValue={operation ? operation.Status : ''}
            onValueChange={(e) => this._pickerOnChange(e, item.Id, 'Status')}
          >
            {
              [
                <Picker.Item label={"- Estado -"} value='0' key={`${item.PartPO.SerialNum}_status_dropdown`} />,
                statusObj.options.map((option, index) => (
                  <Picker.Item label={option.label} value={option.value} key={`${item.PartPO.SerialNum}_${option.value}`} />
                ))
              ]
            }
          </Picker>
          <Button success rounded small onPress={() => this.postLog(item.Id, item.PartPO.SerialNum, isRework, match)}>
            <Text>OK</Text>
          </Button>
        </View>
      </TouchableHighlight>
    )
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

    ReworkWooperationlogResponse: state.workOrder.ReworkWooperationlogResponse,
    ReworkWooperationlog: state.workOrder.ReworkWooperationlog,

    fetchingWooperationlog: state.workOrder.fetchingWooperationlog,

    operators: state.workOrder.operators,
    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchWooperationlogRequest(token, WOKey, RCTKey, OperationKey)),
    requestReworkWooperationlog: (token, WOOLogId) => dispatch(WorkOrderActions.searchReworkWooperationlogRequest(token, WOOLogId)),
    requestPutWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.putWooperationlogRequest(token, data, Id)),
    requestPutReworkWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.putReworkWooperationlogRequest(token, data, Id)),
    requestPostWooperationlog: (token, data) => dispatch(WorkOrderActions.postWooperationlogRequest(token, data)),
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)