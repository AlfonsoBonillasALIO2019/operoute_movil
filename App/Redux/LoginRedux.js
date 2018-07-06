import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username','password'],
  loginSuccess: ['user','token'],
  loginFailure: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  fetching: null,
  error: null,
  token: null
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
  const { user, token } = action
  return state.merge({ fetching: false, error: null, user, token })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, user: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
})
