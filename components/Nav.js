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
      loginActive:true,
      mainPageActive:false,
    }
  }

 //Function is being passed into child and whenever a child calls function, parent is updated
  changeUser(){
    this.setState({
      loginActive: !this.state.loginActive,
      mainPageActive: !this.state.mainPageActive
      });
    console.log(this.state.loginActive);
  }

//        <Card isActive={this.state.mainPageActive} />

  render() {
    return (
      <View>
        <Login login={this.changeUser.bind(this)} isActive={this.state.loginActive} />
        <MainPage isActive={this.state.mainPageActive}/>
      </View>
      );
  }
}


const styles = StyleSheet.create({

});
