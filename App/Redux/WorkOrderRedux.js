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

  searchWooperationlogRequest: ['token', 'WOKey', 'RCTKey', 'OperationKey'],
  searchWooperationlogSuccess: ['Wooperationlog'],
  searchWooperationlogFailure: null,
})

export const WorkOrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  orders: [],
  selectedOrder: null,
  Wooperationlog: null,
  WooperationlogResponse: null,

  fetching: false,
  fetchingSelected: false,
  fetchingWooperationlog: false,
  fetchingRequestWooperationlog: false,

  error: null,
  errorSelected: null,
  errorWooperationlog: null,
  errorResponseWooperationlog: null,
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
})
