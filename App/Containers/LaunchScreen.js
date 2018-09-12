import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Button, Text, Label, Form, Item, Input } from 'native-base'
import LoginActions from '../Redux/LoginRedux'
import { Images } from '../Themes'

class LaunchScreen extends Component {
  state = {
    username: 'alex@login.com',
    password: 'simona'
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
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#012a5a'
      }}>
        <Image resizeMode="contain" source={Images.logo_transparent} style={{ height: 120 }} />
        <View style={{ width: 450, marginTop: 60, backgroundColor: '#f6f6f6', paddingHorizontal: 25, paddingVertical: 35, borderRadius: 30 }}>
          <Form style={{ maxWidth: 380 }}>
            <Item floatingLabel={true} style={{ marginBottom: 15 }}>
              <Label>
                Username
            </Label>
              <Input name='username' value={username} onChangeText={(text) => this.handleInputChange('username', text)} />
            </Item>
            <Item floatingLabel={true} style={{ marginBottom: 25 }}>
              <Label>
                Password
            </Label>
              <Input textContentType='password' secureTextEntry={true} name='password' value={password} onChangeText={(text) => this.handleInputChange('password', text)} />
            </Item>
            <Button style={{ width: 80, elevation: 0, marginHorizontal: 150 }} rounded success onPress={this.handleLogin}>
              <Text>Log In</Text>
            </Button>
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
