import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Button, Label, Form, Item, Input, H3 } from 'native-base'
import LoginActions from '../Redux/LoginRedux'
import styles from './Styles/LoginScreenStyle'
import { Images } from '../Themes'

class LaunchScreen extends Component {
  state = {
    // username: 'alex@login.com',
    // password: 'simona'
    errorMessage: "",
    error: false,
    username: '',
    password: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error === true)
      return { ...state, ...{ error: true, errorMessage: "Oops! Wrong password or email" } }
    else
      return { ...state }
  }

  _validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const result = re.test(email)

    if (result)
      this.setState({ error: false, errorMessage: null })
    else
      this.setState({ error: true, errorMessage: "Please use a valid email" })
  }

  handleInputChange = (name, text) => {
    this.setState({
      [name]: text
    });
  }

  handleLogin = () => {
    const { login } = this.props
    const { username, password } = this.state
    login(username, password)
  }

  render() {
    const { username, password } = this.state
    const { container, flexedColumn, logo, innerBox, username: usernameInput, password: passwordInput, button, buttonText } = styles

    return (
      <View style={[container, flexedColumn]}>
        <Image resizeMode="contain" source={Images.logo_transparent} style={logo} />
        <View style={innerBox}>
          <Form>
            <View style={flexedColumn}>
              <Item floatingLabel={true} style={usernameInput}>
                <Label>Username</Label>
                <Input name='username' onBlur={() => this._validateEmail(username)} value={username} onChangeText={(text) => this.handleInputChange('username', text)} />
              </Item>
              <Item floatingLabel={true} style={passwordInput}>
                <Label>Password</Label>
                <Input textContentType='password' secureTextEntry={true} name='password' value={password} onChangeText={(text) => this.handleInputChange('password', text)} />
              </Item>
              {this.state.error === true &&
                <View>
                  <Label style={{ color: "#a01b1b", marginTop: -15, marginBottom: 10, fontSize: 14, textAlign: "center" }}>{this.state.errorMessage}</Label>
                </View>
              }
              <View>
                <Button style={[button, flexedColumn]} rounded success onPress={this.handleLogin}>
                  <H3 style={buttonText}>Log In</H3>
                </Button>
              </View>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(LoginActions.loginRequest(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
