import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  workOrderRequest: ['token'],
  workOrderSuccess: ['orders'],
  workOrderFailure: null,
  workOrderByIdRequest:['token','workOrderId'],
  workOrderByIdSuccess:['order'],
  workOrderByIdFailure:null,
  searchWooperationlogRequest:['token','WOKey', 'RCTKey', 'OperationKey'],
  searchWooperationlogSuccess:['Wooperationlog'],
  searchWooperationlogFailure:null,
})

export const WorkOrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  orders:[],
  selectedOrder:null,
  fetching:false,
  fetchingSelected:false,
  fetchingWooperationlog:false,
  error:null,
  errorSelected: null,
  errorWooperationlog: null,
  Wooperationlog:null
})

/* ------------- Selectors ------------- */

// export const GithubSelectors = {
//   selectAvatar: state => state.github.avatar
// }

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, action) =>{
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
export const requestSelected = (state, action) =>{
  return state.merge({ fetchingSelected: true, selectedOrder: null })
}

// successful avatar lookup
export const successSelected = (state, action) => {
  const { order } = action
  return state.merge({ fetchingSelected: false, errorSelected: null, selectedOrder:order })
}

// failed to get the avatar
export const failureSelected = (state) =>
  state.merge({ fetchingSelected: false, errorSelected: true, selectedOrder: null })


// request the avatar for a user
export const requestWooperationlog = (state, action) =>{
  return state.merge({ fetchingWooperationlog: true, Wooperationlog: null })
}

// successful avatar lookup
export const successWooperationlog = (state, action) => {
  const { Wooperationlog } = action
  return state.merge({ fetchingWooperationlog: false, errorWooperationlog: null, Wooperationlog:Wooperationlog })
}

// failed to get the avatar
export const failureWooperationlog = (state) =>
  state.merge({ fetchingWooperationlog: false, errorWooperationlog: true, Wooperationlog: null })




/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WORK_ORDER_REQUEST]: request,
  [Types.WORK_ORDER_SUCCESS]: success,
  [Types.WORK_ORDER_FAILURE]: failure,
  [Types.WORK_ORDER_BY_ID_REQUEST]: requestSelected,
  [Types.WORK_ORDER_BY_ID_SUCCESS]: successSelected,
  [Types.WORK_ORDER_BY_ID_FAILURE]: failureSelected,

  [Types.SEARCH_WOOPERATIONLOG_REQUEST]: requestWooperationlog,
  [Types.SEARCH_WOOPERATIONLOG_SUCCESS]: successWooperationlog,
  [Types.SEARCH_WOOPERATIONLOG_FAILURE]: failureWooperationlog,
})
