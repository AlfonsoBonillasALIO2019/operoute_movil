import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Button, Text, Label, Form, Item, Input, H3 } from 'native-base'
import LoginActions from '../Redux/LoginRedux'
import styles from './Styles/LoginScreenStyle'
import { Images } from '../Themes'

class LaunchScreen extends Component {
  state = {
    // username: 'alex@login.com',
    // password: 'simona'
    username: '',
    password: ''
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
                <Input name='username' value={username} onChangeText={(text) => this.handleInputChange('username', text)} />
              </Item>
              <Item floatingLabel={true} style={passwordInput}>
                <Label>Password</Label>
                <Input textContentType='password' secureTextEntry={true} name='password' value={password} onChangeText={(text) => this.handleInputChange('password', text)} />
              </Item>
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
