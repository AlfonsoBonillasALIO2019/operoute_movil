import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function* login(api, action) {
  const { username, password } = action
  // make the call to the api
  const response = yield call(api.login, username, password)
  console.log({ response })
  // alert(JSON.stringify(response))
  if (response.ok) {
    let { data: { user, token } } = response
    yield put(LoginActions.loginSuccess(user, token))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
