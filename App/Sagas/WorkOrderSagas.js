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

    console.log({ data })

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

  console.log({ response })

  if (response.ok) {
    let { data } = response

    console.log({ data })

    data.reverse()
    yield put(WorkOrderActions.searchReworkWooperationlogSuccess(data))
  } else {
    yield put(WorkOrderActions.searchReworkWooperationlogFailure())
  }
}

export function* postWooperationlog(api, action) {
  const { data, token } = action

  // make the call to the api
  const response = yield call(api.postWooperationlog, token, data)

  console.log({ response })

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

  console.log({ response })

  if (response.ok) {
    let { data: dataResponse } = response
    yield put(WorkOrderActions.putWooperationlogSuccess(dataResponse))
  } else {
    yield put(WorkOrderActions.putWooperationlogFailure())
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
