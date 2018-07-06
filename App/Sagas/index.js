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
import { getWorkOrders, getWorkOrderById } from './WorkOrderSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(WorkOrderTypes.WORK_ORDER_REQUEST, getWorkOrders, api),
    takeLatest(WorkOrderTypes.WORK_ORDER_BY_ID_REQUEST, getWorkOrderById, api),
  ])
}
