import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import WorkOrderActions from '../Redux/WorkOrderRedux'

export function* getWorkOrders(api, action) {
  const { token } = action
  // make the call to the api
  const response = yield call(api.getWorkOrders, token)
  // alert(JSON.stringify({name:'alfredo'}))

  if (response.ok) {
    let { data } = response
    data.reverse()
    yield put(WorkOrderActions.workOrderSuccess(data))
  } else {
    yield put(WorkOrderActions.workOrderFailure())
  }
}

export function* getActiveOperators(api, action) {
  const { token } = action

  const response = yield call(api.getActiveOperators, token)

  if (response.ok) {
    let { data } = response
    yield put(WorkOrderActions.operatorsSuccess(data))
  } else {
    yield put(WorkOrderActions.operatorsFailure())
  }
}

export function* getQAUsers(api, action) {
  const { token } = action

  const response = yield call(api.getQAUsers, token)

  if (response.ok) {
    let { data } = response
    yield put(WorkOrderActions.usersQASuccess(data))
  } else {
    yield put(WorkOrderActions.usersQAFailure())
  }
}

export function* searchWooperationlog(api, action) {
  const { WOKey, RCTKey, OperationKey, token } = action

  // make the call to the api
  const response = yield call(api.searchWooperationlog, token,
    filter = {
      WOKey,
      RCTKey,
      OperationKey,
    })

  if (response.ok) {
    let { data } = response

    data.reverse()
    yield put(WorkOrderActions.searchWooperationlogSuccess(data))
  } else {
    yield put(WorkOrderActions.searchWooperationlogFailure())
  }
}

export function* searchReworkWooperationlog(api, action) {
  const { WOOLogId, token } = action

  // make the call to the api
  const response = yield call(api.searchReworkWooperationlog, token, WOOLogId)

  if (response.ok) {
    let { data } = response
    data.reverse()
    yield put(WorkOrderActions.searchReworkWooperationlogSuccess(data))
  } else {
    yield put(WorkOrderActions.searchReworkWooperationlogFailure())
  }
}

export function* searchFirstPOWooperationlog(api, action) {
  const { WOKey, RCTKey, OperationKey, token } = action

  // make the call to the api
  const response = yield call(api.searchFirstPOWooperationlog, token,
    filter = {
      WOKey,
      RCTKey,
      OperationKey,
    })

  if (response.ok) {
    let { data } = response

    data.reverse()
    yield put(WorkOrderActions.searchFirstPOWooperationlogSuccess(data))
  } else {
    yield put(WorkOrderActions.searchFirstPOWooperationlogFailure())
  }
}

export function* postFirstPO(api, action) {
  const { data, token } = action

  // make the call to the api
  const response = yield call(api.postFirstPO, token, data)

  if (response.ok) {
    let { data: dataResponse } = response
    yield put(WorkOrderActions.postFirstPOSuccess(dataResponse))
  } else {
    yield put(WorkOrderActions.postFirstPOFailure())
  }
}

export function* postWooperationlog(api, action) {
  const { data, token } = action

  // make the call to the api
  const response = yield call(api.postWooperationlog, token, data)

  if (response.ok) {
    let { data: dataResponse } = response
    yield put(WorkOrderActions.postWooperationlogSuccess(dataResponse))
  } else {
    yield put(WorkOrderActions.postWooperationlogFailure())
  }
}

export function* putWooperationlog(api, action) {
  const { Id, data, token } = action

  // make the call to the api
  const response = yield call(api.putWooperationlog, token, data, Id)

  if (response.ok) {
    let { data: dataResponse } = response
    yield put(WorkOrderActions.putWooperationlogSuccess(dataResponse))
  } else {
    yield put(WorkOrderActions.putWooperationlogFailure())
  }
}

export function* putReworkWooperationlog(api, action) {
  const { Id, data, token } = action

  // make the call to the api
  const response = yield call(api.putReworkWooperationlog, token, data, Id)

  if (response.ok) {
    let { data: dataResponse } = response
    yield put(WorkOrderActions.putReworkWooperationlogSuccess(dataResponse))
  } else {
    yield put(WorkOrderActions.putReworkWooperationlogFailure())
  }
}

export function* getWorkOrderById(api, action) {
  const { token, workOrderId } = action
  // make the call to the api
  const response = yield call(api.getWorkOrderById, token, workOrderId)
  // alert(JSON.stringify(response.data))

  if (response.ok) {
    yield put(WorkOrderActions.workOrderByIdSuccess(response.data))
  } else {
    yield put(WorkOrderActions.workOrderByIdFailure())
  }
}
