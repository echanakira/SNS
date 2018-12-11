import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Marker from 'react-native-maps';

import Login from './Login';
import MainPage from './MainPage';
import Card from './Card';
import Map from './Map'
import Map2 from './Map2'



export default class Nav extends React.Component {

  constructor() {
    super();
    this.state={
      loginActive:false,
      mainPageActive:true,
      user:'',
    }
  }

 //Function is being passed into child and whenever a child calls function, parent is updated
  changeUser(userInfo){
    console.log('[Nav] userInfo = ' + userInfo)
    this.state.user = userInfo;
    this.setState({
        loginActive: !this.state.loginActive,
        mainPageActive: !this.state.mainPageActive,
      });
      console.log('[Nav] user = ' + this.state.user);
  }


//        <Card isActive={this.state.mainPageActive} />

  render() {
    console.log('[Nav] State Changed');
    console.log('[Nav] this.state.user= ' + this.state.user);
    return (
      <View>
        <Login login={this.changeUser.bind(this)} isActive={this.state.loginActive} />
        <MainPage isActive={this.state.mainPageActive} userInfo={this.state.user}/>
      </View>
      );
  }
}


const styles = StyleSheet.create({

});
