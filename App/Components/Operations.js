import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import Dialog from "react-native-dialog"
import SocketIOClient from 'socket.io-client'
import { View, FlatList } from 'react-native'
import { Picker, Button, Text, ListItem, Icon, Left, Right, Body } from 'native-base'
import styles from './Styles/OperationsStyle'
import WorkOrderActions from '../Redux/WorkOrderRedux'
import stylesListItem from '../Containers/Styles/HomeScreenStyles'

const socket = SocketIOClient('http://192.168.10.21:3050')

class Operations extends Component {
  state = {
    operations: [],
    operationsLog: [],

    prompt: {
      SerialNum: '',
      Visible: '',
      Duration: 0,
      IsSuccessful: false,
      Pause_ReasonCode: '',
      isRework: false,
      ReworkId: 0,
      match: null,
      UserKey: '0',
    },

    actionPrompt: {
      Visible: false,
      options: [],
      logStatusObj: null,
    },

    ReworkWooperationlog: [],
    FirstPOWooperationlog: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { ReworkWooperationlog } = state

    if (props.operations === state.operations && props.FirstPOWooperationlog === state.FirstPOWooperationlog && (props.ReworkWooperationlog && ReworkWooperationlog.indexOf(props.ReworkWooperationlog[0]) > -1)) {
      return state
    } else {
      if (props.ReworkWooperationlog && props.ReworkWooperationlog.length > 0) {
        ReworkWooperationlog.push(props.ReworkWooperationlog[0])
      }

      return { ...state, ...{ operations: props.operations, ReworkWooperationlog, FirstPOWooperationlog: props.FirstPOWooperationlog } }
    }
  }

  componentDidMount = () => {
    const { requestUsersQA, requestOperators, token, requestWooperationlog, requestFirstPOWooperationlog, search: { WOKey, RCTKey, OperationKey }, passOffReqd } = this.props

    requestUsersQA(token)
    requestOperators(token)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
    requestFirstPOWooperationlog(token, WOKey, RCTKey, OperationKey)
  }

  componentWillUnmount = () => {
    this._cleanState() // Clean state cause we need to render new info
  }

  _cleanState = () => {
    this.setState({
      prompt: {
        SerialNum: '',
        Visible: '',
        Duration: 0,
        IsSuccessful: false,
        Pause_ReasonCode: '',
        isRework: false,
        ReworkId: 0,
        match: null,
        UserKey: '0',
      },

      actionPrompt: {
        Visible: false,
        options: [],
        item: null,
      },

      ReworkWooperationlog: [],
      FirstPOWooperationlog: [],
    })
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
      label: 'Start',
      options: [{ label: "Start", value: 'Start' }]
    }

    match = null
    isRework = false

    if (Wooperationlog) {
      // Look for match
      match = Wooperationlog.filter(log => log.SerialNum === item.PartPO.SerialNum)[0]

      if (match) {
        // Get match status Color, Label and Options
        statusObj = this._getLogStatusValues(match)
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

    if (log.Rework) return { label: 'Rework', color: '#EC4626', options }
    if (log.OperationSuccess) return { label: 'Approved', color: '#26B99A', options }
    if (log.OperationSuccess === false) return { label: 'NCR', color: '#D9534F', options }
    if (log.Paused) return { label: 'Paused', color: '#F0AD4E', options }
    if (log.Started) return !isRework ? { label: 'Started', color: '#337AB7', options } : { label: 'Reworking', color: '#EC4626', options }

    return !isRework ? { label: 'Start', color: 'gray', options } : { label: 'Rework', color: '#EC4626', options }
  }

  // Gets the available status options array for the current item log status
  _getLogStatusOptions = (log, isRework) => {
    if (log.OperationSuccess)
      return [{ label: "Failure", value: 'Fail' }]

    if (log.OperationSuccess === false)
      return [{ label: "Approve", value: 'Pass' }]

    if (log.Paused)
      return [{ label: "Resume", value: 'Resume' }]

    if (log.Started) {
      return [
        { label: "Pause", value: 'Pause' },
        { label: "Approve", value: 'Pass' },
        { label: "Failure", value: 'Fail' }
      ]
    }

    if (isRework)
      return [{ label: "Restart", value: 'Start' }]

    return [{ label: "Start", value: 'Start' }]
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

    this.setState({ actionPrompt: { ...this.state.actionPrompt, Visible: false, } })
    socket.emit('requestWOOperationLogData')
  }

  _pause = () => {
    const { token, requestPutWooperationlog, requestPutReworkWooperationlog, requestWooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
    const { prompt: { SerialNum, match, isRework, Pause_ReasonCode } } = this.state
    const Pause_Date = moment().format()

    const data = {
      Pause_ReasonCode,
      Id: match.Id,
      Paused: true,
      Pause_Date,
      SerialNum,
      WOKey
    }

    isRework ? requestPutReworkWooperationlog(token, data, match.Id) : requestPutWooperationlog(token, data, match.Id)
    match && requestReworkWooperationlog(token, match.Id)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)

    socket.emit('requestWOOperationLogData')
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

    this.setState({
      actionPrompt: {
        Visible: false,
        options: [],
        logStatusObj: null,
      }
    })
    socket.emit('requestWOOperationLogData')
  }

  _terminate = (IsSuccessful, isRework, match) => {
    const { token, requestPutWooperationlog, requestPutReworkWooperationlog, requestWooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey }, passOffReqd } = this.props
    const { StartDate, EndDate: current_EndDate, Id } = match
    const { prompt: { Duration, UserKey } } = this.state
    const new_EndDate = moment().format()
    const SuccessDate = moment().format()

    const duration = this.getMinutesBetweenDates(new_EndDate, moment(StartDate).add(7, 'hours')) + Duration

    if (duration < 1) {
      this.setState({
        actionPrompt: {
          Visible: false,
          options: [],
          logStatusObj: null,
        },
        prompt: {
          Visible: 'duration',
          IsSuccessful,
          Duration: 0,
          isRework,
          UserKey,
          match,
        },
      })

      return false
    }

    if (passOffReqd && this.state.FirstPOWooperationlog.length === 0 && UserKey === "0" && IsSuccessful) {
      this.setState({
        actionPrompt: {
          Visible: false,
          options: [],
          logStatusObj: null,
        },
        prompt: {
          Visible: 'firstPO',
          IsSuccessful,
          Duration,
          isRework,
          UserKey,
          match,
        },
      })

      return false
    }

    data = {
      OperationSuccess: IsSuccessful,
      Id,
    }

    if (IsSuccessful)
      data = {
        ...data,
        OperationSuccess: IsSuccessful,
      }

    if (!current_EndDate)
      data = {
        ...data,
        EndDate: new_EndDate,
        Duration: duration,
      }

    isRework ? requestPutReworkWooperationlog(token, data, Id) : requestPutWooperationlog(token, data, Id)

    this._cleanState() // Clean state cause we need to render new info

    match && requestReworkWooperationlog(token, match.Id)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)

    socket.emit('requestWOOperationLogData')
  }

  getMinutesBetweenDates = (startDate, endDate) => (Math.abs(new Date(startDate) - new Date(endDate))) / 60000

  postLog = (id, SerialNum, isRework, match = null) => {
    const { token, requestWooperationlog, requestReworkWooperationlog, search: { WOKey, RCTKey, OperationKey } } = this.props
    const operationLog = this.state.operationsLog[id]

    if (!operationLog || !operationLog.OperatorKey || !operationLog.OperatorKey === "0" || operationLog.Status === "0") {
      alert("Please select Operator and Status.")
      return false
    }

    switch (operationLog.Status) {
      case "Start": {
        this._start(id, SerialNum, isRework, match)
        break
      }
      case "Pause": {
        this.setState({ actionPrompt: { ...this.state.actionPrompt, Visible: false }, prompt: { Visible: 'pause', SerialNum, match, isRework } })
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

    this.setState({ ReworkWooperationlog: [], FirstPOWooperationlog: [] })
    match && requestReworkWooperationlog(token, match.Id)
    requestWooperationlog(token, WOKey, RCTKey, OperationKey)
    //requestRefreshPanel(token)
    socket.emit('requestWOOperationLogData')
  }

  renderDurationPrompt = () => {
    const {
      prompt,
      prompt: {
        Visible,
        IsSuccessful,
        Duration,
        isRework,
        match,
      },
    } = this.state

    return (
      <Dialog.Container visible={Visible === 'duration'}>
        <Dialog.Title style={{ borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 20, marginBottom: 10, color: '#828282' }}>Duration</Dialog.Title>
        <Dialog.Description style={{ color: '#828282' }}>
          Please introduce the exact duration of this operation.
        </Dialog.Description>
        <Dialog.Input value={Duration} onChangeText={(text) => {
          prompt.Duration = Number(text)
          this.setState({ prompt })
        }} />
        <Dialog.Button style={{ color: '#828282' }} label="Cancel" onPress={() => this._cleanState()} />
        <Dialog.Button style={{ color: '#4f6987' }} label="Confirm" onPress={() => {
          if (!Duration || Duration < 1) {
            alert("Please introduce a valid duration.")
            return false
          }

          prompt.Visible = ''
          prompt.ReworkWooperationlog = []
          prompt.FirstPOWooperationlog = []

          this.setState({ prompt })
          this._terminate(IsSuccessful, isRework, match) // Calls API call for Fail status
        }} />
      </Dialog.Container>
    )
  }

  renderFirstPOPrompt = () => {
    let {
      prompt,
      prompt: {
        IsSuccessful,
        isRework,
        Visible,
        match,
        UserKey,
      },
    } = this.state

    const { usersQA } = this.props

    return (
      <Dialog.Container visible={Visible === 'firstPO'}>
        <Dialog.Title style={{ borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 20, marginBottom: 10, color: '#828282' }}>First Pass Off</Dialog.Title>
        <Dialog.Description style={{ color: '#828282' }}>
          Please assign a QA engineer to inspect this part.
        </Dialog.Description>
        <Picker
          selectedValue={UserKey}
          style={{ maxHeight: 50 }}
          onValueChange={(e) => {
            prompt.UserKey = e
            this.setState({ prompt })
          }}>
          {usersQA &&
            [
              <Picker.Item label={"- QA Engineer -"} value='0' key={'qa_user_picker_default'} />,
              usersQA.map((user, index) => (
                <Picker.Item label={`${user.FirstName} ${user.LastName}`} value={user.Id} key={user.Email} />
              ))
            ]
          }
        </Picker>
        <Dialog.Button style={{ color: '#828282' }} label="Cancel" onPress={() => this._cleanState()} />
        <Dialog.Button style={{ color: '#4f6987' }} label="Confirm" onPress={() => {
          if (UserKey === '0' || !UserKey) {
            alert("Please select a QA Engineer.")
            return false
          }

          const { requestPostFirstPO, token, search: { WOKey, RCTKey, OperationKey } } = this.props
          const data = { WOKey, RCTKey, UserKey, OperationKey, SerialNum: match.SerialNum }

          prompt.Visible = ''
          prompt.ReworkWooperationlog = []
          prompt.FirstPOWooperationlog = []

          this.setState({ prompt }) // Hide the dialog
          this._terminate(IsSuccessful, isRework, match) // Calls API call for Fail status
          requestPostFirstPO(token, data) // Post the First Pass Off object
        }} />
      </Dialog.Container>
    )
  }

  renderPauseCausePrompt = () => {
    let { prompt, prompt: { Pause_ReasonCode, Visible } } = this.state
    return (
      <Dialog.Container visible={Visible === 'pause'}>
        <Dialog.Title style={{ borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 20, marginBottom: 10, color: '#828282' }}>
          Please introduce a pause reason
        </Dialog.Title>
        <Dialog.Input value={Pause_ReasonCode} onChangeText={(e) => {
          prompt.Pause_ReasonCode = e
          this.setState({ prompt })
        }} />
        <Dialog.Button style={{ color: '#828282' }} label="Cancel" onPress={() => this._cleanState()} />
        <Dialog.Button style={{ color: '#4f6987' }} label="Confirm" onPress={() => {
          if (!Pause_ReasonCode || Pause_ReasonCode === '') {
            alert("Please introduce a valid pause reason.")
            return false
          }

          this._pause() // Calls API call for Pause status
          this._cleanState() // Clean state cause we need to render new info
        }} />
      </Dialog.Container>
    )
  }

  renderActionPrompt = () => {
    let {
      actionPrompt: {
        Visible,
        item,
        logStatusObj
      },
    } = this.state

    if (!Visible) return false

    const { operators } = this.props
    const operation = this.state.operationsLog[item.Id]
    const { statusObj, match, isRework } = logStatusObj

    const pickerProps = {
      placeholderStyle: { color: "#bfc6ea" },
      placeholderIconColor: "#007aff",
      style: { maxHeight: 60, height: 60, color: '#36454f' },
    }

    return (
      <Dialog.Container visible={Visible}>
        <Dialog.Title style={{ borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 20, marginBottom: 10, color: '#828282' }}>Modify operation <Text style={{ color: '#4f6987' }}>{item.PartPO.SerialNum}</Text> status</Dialog.Title>
        <Dialog.Description style={{ color: '#828282' }}>
          Select operator and new status.
        </Dialog.Description>
        <Picker
          {...pickerProps}
          placeholder="Operator"
          selectedValue={operation ? operation.OperatorKey : ''}
          onValueChange={(e) => this._pickerOnChange(e, item.Id, 'OperatorKey')}
        >
          {operators &&
            [
              <Picker.Item style={{ color: '#828282' }} label={"- Operator -"} value='0' key={`${item.PartPO.SerialNum}_operador_dropdown`} />,
              operators.map((operator, index) => (
                <Picker.Item style={{ color: '#828282' }} label={operator.Name} value={operator.Id} key={`${item.PartPO.SerialNum}_${operator.Id}`} />
              ))
            ]
          }
        </Picker>
        <Picker
          {...pickerProps}
          placeholder="Status"
          selectedValue={operation ? operation.Status : ''}
          onValueChange={(e) => this._pickerOnChange(e, item.Id, 'Status')}
        >
          {
            [
              <Picker.Item style={{ color: '#828282' }} label={"- Status -"} value='0' key={`${item.PartPO.SerialNum}_status_dropdown`} />,
              statusObj.options.map((option, index) => (
                <Picker.Item style={{ color: '#828282' }} label={option.label} value={option.value} key={`${item.PartPO.SerialNum}_${option.value}`} />
              ))
            ]
          }
        </Picker>
        <Dialog.Button style={{ color: '#828282' }} label="Cancel" onPress={() => this._cleanState()} />
        <Dialog.Button style={{ color: '#4f6987', fontWeight: '500' }} label="Confirm" onPress={() => this.postLog(item.Id, item.PartPO.SerialNum, isRework, match)} />
      </Dialog.Container>
    )
  }

  _renderItem = ({ item }) => {
    const { fetchingLogs } = this.props
    const logStatusObj = this._getLogStatusObject(item)
    const { statusObj } = logStatusObj
    const itemStatusColor = !fetchingLogs ? statusObj.color : 'gray'
    const itemStatusLabel = !fetchingLogs ? statusObj.label : 'Loading'

    const { listItem, listItemLeft, listItemLeftTextMain, listItemLeftTextSecondary, listItemRightView, listItemRightViewLabel, listItemRightViewDate, listItemRightViewIcon } = stylesListItem

    return (
      <ListItem style={[listItem, { borderColor: itemStatusColor }]}>
        <Left style={listItemLeft}>
          <Body>
            <Text style={[listItemLeftTextMain, { marginBottom: 0 }]}>{item.PartPO.SerialNum}</Text>
          </Body>
        </Left>
        <Right>
          <View style={listItemRightView}>
            <Text style={listItemRightViewLabel}>Current status:</Text>
            <Text style={[listItemRightViewDate, { color: itemStatusColor, fontWeight: '500', marginLeft: 5, marginRight: 15 }]}>{itemStatusLabel}</Text>
            <Button
              rounded
              onPress={() => this.setState({ actionPrompt: { Visible: true, item, logStatusObj } })}
              style={{ borderColor: '#eeeeee', borderWidth: 1, elevation: 0, backgroundColor: '#FFFFFF', height: 40, width: 40, borderRadius: 20, justifyContent: 'center' }}>
              <Icon style={{ color: '#dadada' }} name="md-more" />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }

  render() {
    const { operations = [] } = this.state

    return (
      <View style={styles.container}>
        {this.renderDurationPrompt()}
        {this.renderPauseCausePrompt()}
        {this.renderFirstPOPrompt()}
        {this.renderActionPrompt()}
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
    FirstPOResponse: state.workOrder.FirstPOResponse,

    WooperationlogResponse: state.workOrder.WooperationlogResponse,
    Wooperationlog: state.workOrder.Wooperationlog,

    ReworkWooperationlogResponse: state.workOrder.ReworkWooperationlogResponse,
    ReworkWooperationlog: state.workOrder.ReworkWooperationlog,

    FirstPOWooperationlog: state.workOrder.FirstPOWooperationlog,

    fetchingLogs: state.workOrder.fetchingLogs,

    operators: state.workOrder.operators,
    usersQA: state.workOrder.usersQA,
    refreshStatus: state.workOrder.refreshStatus,

    token: state.login.token,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestFirstPOWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchFirstPOWooperationlogRequest(token, WOKey, RCTKey, OperationKey)),
    requestWooperationlog: (token, WOKey, RCTKey, OperationKey) => dispatch(WorkOrderActions.searchWooperationlogRequest(token, WOKey, RCTKey, OperationKey)),
    requestReworkWooperationlog: (token, WOOLogId) => dispatch(WorkOrderActions.searchReworkWooperationlogRequest(token, WOOLogId)),
    requestPutWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.putWooperationlogRequest(token, data, Id)),
    requestPutReworkWooperationlog: (token, data, Id) => dispatch(WorkOrderActions.putReworkWooperationlogRequest(token, data, Id)),
    requestPostWooperationlog: (token, data) => dispatch(WorkOrderActions.postWooperationlogRequest(token, data)),
    requestPostFirstPO: (token, data) => dispatch(WorkOrderActions.postFirstPORequest(token, data)),
    requestOperators: token => dispatch(WorkOrderActions.operatorsRequest(token)),
    requestUsersQA: token => dispatch(WorkOrderActions.usersQARequest(token)),
    // requestRefreshPanel: token => dispatch(WorkOrderActions.refreshPanelRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)