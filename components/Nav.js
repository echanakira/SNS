import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Marker from 'react-native-maps';

import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import Card from './Card';
import Map from './Map';



export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      loginActive:true,
      mainPageActive:false,
      isRegisterActive:false,
      user:'',
    }
    this.close = this.closeRegister.bind(this);
    this.closeLogin = this.changeUser.bind(this);
  }

  closeRegister = () => {
    console.log('[Nav] Registering');
    this.setState({loginActive: !this.state.loginActive});
    this.setState({isRegisterActive: !this.state.isRegisterActive});
  }

 //Function is being passed into child and whenever a child calls function, parent is updated
  changeUser(userInfo){
    this.state.user = userInfo;
    this.setState({
        loginActive: !this.state.loginActive,
        mainPageActive: !this.state.mainPageActive,
      });
  }


//        <Card isActive={this.state.mainPageActive} />

  render() {
    return (
      <View>
        <Login login={this.changeUser.bind(this)} isActive={this.state.loginActive}  toggleRegister={this.close}/>
        <Register isActive={this.state.isRegisterActive} toggleRegister={this.close} />
        <MainPage isActive={this.state.mainPageActive} userInfo={this.state.user} toggleLogin={this.closeLogin}/>
      </View>
      );
  }
}


const styles = StyleSheet.create({

});
