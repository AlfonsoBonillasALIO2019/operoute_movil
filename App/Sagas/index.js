import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { WorkOrderTypes } from '../Redux/WorkOrderRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import {
  getQAUsers,

  getWorkOrders,
  getWorkOrderById,
  getActiveOperators,
  getWorkOrdersBySerial,

  refreshPanel,

  postFirstPO,
  postWooperationlog,

  putWooperationlog,
  putReworkWooperationlog,

  searchWooperationlog,
  searchReworkWooperationlog,
  searchFirstPOWooperationlog
} from './WorkOrderSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),

    takeLatest(WorkOrderTypes.OPERATORS_REQUEST, getActiveOperators, api),
    takeLatest(WorkOrderTypes.USERS_Q_A_REQUEST, getQAUsers, api),

    takeLatest(WorkOrderTypes.REFRESH_PANEL_REQUEST, refreshPanel, api),

    takeLatest(WorkOrderTypes.WORK_ORDER_REQUEST, getWorkOrders, api),
    takeLatest(WorkOrderTypes.WORK_ORDER_BY_ID_REQUEST, getWorkOrderById, api),
    takeLatest(WorkOrderTypes.WORK_ORDER_BY_SERIAL_REQUEST, getWorkOrdersBySerial, api),

    takeLatest(WorkOrderTypes.PUT_WOOPERATIONLOG_REQUEST, putWooperationlog, api),
    takeLatest(WorkOrderTypes.POST_WOOPERATIONLOG_REQUEST, postWooperationlog, api),
    takeLatest(WorkOrderTypes.SEARCH_WOOPERATIONLOG_REQUEST, searchWooperationlog, api),

    takeLatest(WorkOrderTypes.PUT_REWORK_WOOPERATIONLOG_REQUEST, putReworkWooperationlog, api),
    takeLatest(WorkOrderTypes.SEARCH_REWORK_WOOPERATIONLOG_REQUEST, searchReworkWooperationlog, api),

    takeLatest(WorkOrderTypes.POST_FIRST_P_O_REQUEST, postFirstPO, api),
    takeLatest(WorkOrderTypes.SEARCH_FIRST_P_O_WOOPERATIONLOG_REQUEST, searchFirstPOWooperationlog, api),
  ])
}
