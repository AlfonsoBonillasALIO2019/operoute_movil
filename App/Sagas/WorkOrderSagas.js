import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import WorkOrderActions from '../Redux/WorkOrderRedux'

export function * getWorkOrders (api, action) {
  const { token } = action
  // make the call to the api
  const response = yield call(api.getWorkOrders, token)
  // alert(JSON.stringify({name:'alfredo'}))

  if (response.ok) {
    let { data } = response
    yield put(WorkOrderActions.workOrderSuccess(data))
  } else {
    yield put(WorkOrderActions.workOrderFailure())
  }
}

export function * getWorkOrderById (api, action) {
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
