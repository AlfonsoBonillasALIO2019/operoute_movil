import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  operatorsRequest: ['token'],
  operatorsSuccess: ['operators'],
  operatorsFailure: null,

  workOrderRequest: ['token'],
  workOrderSuccess: ['orders'],
  workOrderFailure: null,

  workOrderByIdRequest: ['token', 'workOrderId'],
  workOrderByIdSuccess: ['order'],
  workOrderByIdFailure: null,

  postWooperationlogRequest: ['token', 'data'],
  postWooperationlogSuccess: ['WooperationlogResponse'],
  postWooperationlogFailure: null,

  putWooperationlogRequest: ['token', 'data', 'Id'],
  putWooperationlogSuccess: ['WooperationlogResponse'],
  putWooperationlogFailure: null,

  putReworkWooperationlogRequest: ['token', 'data', 'Id'],
  putReworkWooperationlogSuccess: ['ReworkWooperationlogResponse'],
  putReworkWooperationlogFailure: null,

  searchWooperationlogRequest: ['token', 'WOKey', 'RCTKey', 'OperationKey'],
  searchWooperationlogSuccess: ['Wooperationlog'],
  searchWooperationlogFailure: null,

  searchReworkWooperationlogRequest: ['token', 'WOOLogId'],
  searchReworkWooperationlogSuccess: ['ReworkWooperationlog'],
  searchReworkWooperationlogFailure: null,
})

export const WorkOrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  orders: [],
  selectedOrder: null,
  Wooperationlog: null,
  ReworkWooperationlog: null,
  WooperationlogResponse: null,
  ReworkWooperationlogResponse: null,

  fetching: false,
  fetchingSelected: false,
  fetchingWooperationlog: false,
  fetchingReworkWooperationlog: false,
  fetchingRequestWooperationlog: false,
  fetchingReworkRequestWooperationlog: false,

  error: null,
  errorSelected: null,
  errorWooperationlog: null,
  errorReworkWooperationlog: null,
  errorResponseWooperationlog: null,
  errorReworkResponseWooperationlog: null,
})

/* ------------- Selectors ------------- */

// export const GithubSelectors = {
//   selectAvatar: state => state.github.avatar
// }

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, action) => {
  return state.merge({ fetching: true, user: null })
}

// successful avatar lookup
export const success = (state, action) => {
  const { orders } = action
  return state.merge({ fetching: false, error: null, orders })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, orders: [] })


// request the avatar for a user
export const requestSelected = (state, action) => {
  return state.merge({ fetchingSelected: true, selectedOrder: null })
}

// successful avatar lookup
export const successSelected = (state, action) => {
  const { order } = action
  return state.merge({ fetchingSelected: false, errorSelected: null, selectedOrder: order })
}

// failed to get the avatar
export const failureSelected = (state) =>
  state.merge({ fetchingSelected: false, errorSelected: true, selectedOrder: null })


// request wooperationlog data
export const requestWooperationlog = (state, action) => {
  return state.merge({ fetchingWooperationlog: true, Wooperationlog: null })
}

// successful wooperationlog data
export const successWooperationlog = (state, action) => {
  const { Wooperationlog } = action
  return state.merge({ fetchingWooperationlog: false, errorWooperationlog: null, Wooperationlog: Wooperationlog })
}

// failed to post the wooperationlog data
export const failureWooperationlog = (state) =>
  state.merge({ fetchingWooperationlog: false, errorWooperationlog: true, Wooperationlog: null })

// request rework wooperationlog data
export const requestReworkWooperationlog = (state, action) => {
  return state.merge({ fetchingReworkWooperationlog: true, ReworkWooperationlog: null })
}

// successful rework wooperationlog data
export const successReworkWooperationlog = (state, action) => {
  const { ReworkWooperationlog } = action
  return state.merge({ fetchingReworkWooperationlog: false, errorReworkWooperationlog: null, ReworkWooperationlog: ReworkWooperationlog })
}

// failed to post the rework wooperationlog data
export const failureReworkWooperationlog = (state) =>
  state.merge({ fetchingReworkWooperationlog: false, errorReworkWooperationlog: true, ReworkWooperationlog: null })

// request post wooperationlog
export const requestPostWooperationlog = (state, action) => {
  return state.merge({ fetchingRequestWooperationlog: true, WooperationlogResponse: null })
}

// successful post wooperationlog
export const successPostWooperationlog = (state, action) => {
  const { WooperationlogResponse } = action
  return state.merge({ fetchingRequestWooperationlog: false, errorResponseWooperationlog: null, WooperationlogResponse: WooperationlogResponse })
}

// failed to post the wooperationlog
export const failurePostWooperationlog = (state) =>
  state.merge({ fetchingRequestWooperationlog: false, errorResponseWooperationlog: true, WooperationlogResponse: null })

// request post wooperationlog
export const requestPutWooperationlog = (state, action) => {
  return state.merge({ fetchingRequestWooperationlog: true, WooperationlogResponse: null })
}

// successful post wooperationlog
export const successPutWooperationlog = (state, action) => {
  const { WooperationlogResponse } = action
  return state.merge({ fetchingRequestWooperationlog: false, errorResponseWooperationlog: null, WooperationlogResponse: WooperationlogResponse })
}

// failed to post the wooperationlog
export const failurePutWooperationlog = (state) =>
  state.merge({ fetchingRequestWooperationlog: false, errorResponseWooperationlog: true, WooperationlogResponse: null })

// request post wooperationlog
export const requestPutReworkWooperationlog = (state, action) => {
  return state.merge({ fetchingReworkRequestWooperationlog: true, ReworkWooperationlogResponse: null })
}

// successful post wooperationlog
export const successPutReworkWooperationlog = (state, action) => {
  const { ReworkWooperationlogResponse } = action
  return state.merge({ fetchingReworkRequestWooperationlog: false, errorReworkResponseWooperationlog: null, ReworkWooperationlogResponse: ReworkWooperationlogResponse })
}

// failed to post the wooperationlog
export const failurePutReworkWooperationlog = (state) =>
  state.merge({ fetchingReworkRequestWooperationlog: false, errorReworkResponseWooperationlog: true, ReworkWooperationlogResponse: null })

// operators request
export const requestOperators = (state, action) => {
  return state.merge({ fetching: true })
}

export const successOperators = (state, action) => {
  const { operators } = action
  return state.merge({ fetching: false, operators })
}

export const failureOperators = (state) =>
  state.merge({ fetching: false, error: true, operators: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPERATORS_REQUEST]: requestOperators,
  [Types.OPERATORS_SUCCESS]: successOperators,
  [Types.OPERATORS_FAILURE]: failureOperators,

  [Types.WORK_ORDER_REQUEST]: request,
  [Types.WORK_ORDER_SUCCESS]: success,
  [Types.WORK_ORDER_FAILURE]: failure,

  [Types.WORK_ORDER_BY_ID_REQUEST]: requestSelected,
  [Types.WORK_ORDER_BY_ID_SUCCESS]: successSelected,
  [Types.WORK_ORDER_BY_ID_FAILURE]: failureSelected,

  [Types.SEARCH_WOOPERATIONLOG_REQUEST]: requestWooperationlog,
  [Types.SEARCH_WOOPERATIONLOG_SUCCESS]: successWooperationlog,
  [Types.SEARCH_WOOPERATIONLOG_FAILURE]: failureWooperationlog,

  [Types.POST_WOOPERATIONLOG_REQUEST]: requestPostWooperationlog,
  [Types.POST_WOOPERATIONLOG_SUCCESS]: successPostWooperationlog,
  [Types.POST_WOOPERATIONLOG_FAILURE]: failurePostWooperationlog,

  [Types.PUT_WOOPERATIONLOG_REQUEST]: requestPutWooperationlog,
  [Types.PUT_WOOPERATIONLOG_SUCCESS]: successPutWooperationlog,
  [Types.PUT_WOOPERATIONLOG_FAILURE]: failurePutWooperationlog,

  [Types.SEARCH_REWORK_WOOPERATIONLOG_REQUEST]: requestReworkWooperationlog,
  [Types.SEARCH_REWORK_WOOPERATIONLOG_SUCCESS]: successReworkWooperationlog,
  [Types.SEARCH_REWORK_WOOPERATIONLOG_FAILURE]: failureReworkWooperationlog,

  [Types.PUT_REWORK_WOOPERATIONLOG_REQUEST]: requestPutReworkWooperationlog,
  [Types.PUT_REWORK_WOOPERATIONLOG_SUCCESS]: successPutReworkWooperationlog,
  [Types.PUT_REWORK_WOOPERATIONLOG_FAILURE]: failurePutReworkWooperationlog,
})
