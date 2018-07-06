import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Images } from '../Themes'
import { Container, Header, Title, Content, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, 
  Card, CardItem,
  Form, Item, Input } from 'native-base';

import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  state={
    username:'alex@login.com',
    password:'simona'
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
          }}>
            <Image source={Images.launch} />
            <View style={{width: 600}}>
              <Form>
                <Item success>
                  <Input name='username' value={username} onChange={this.handleInputChange} placeholder="Username" />
                </Item>
                <Item last>
                  <Input name='password' value={password} onChange={this.handleInputChange} placeholder="Password" />
                </Item>
                <Button rounded block success
                  onPress={this.handleLogin}>
                  <Text>Log in</Text>
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
    login:(username,password)=>{
      dispatch(LoginActions.loginRequest(username,password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
