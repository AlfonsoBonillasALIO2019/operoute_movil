import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function* login(api, action) {
  const { username, password } = action
  const response = yield call(api.login, username, password)

  if (response.ok) {
    let { data: { user, token } } = response
    yield put(LoginActions.loginSuccess(user, token))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
