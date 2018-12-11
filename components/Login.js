import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn:false,
      response:{},
    };

  }

  render() {
    if(!this.props.isActive){
      return null;
    }

    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          placeholder='username'
          onChangeText={name => this.setState({username: name})}
          //onSubmitEditing={this.passwordInput.focus}
        />

        <TextInput
          //ref={ref => (this.passwordInput = ref)}
          value={this.state.password}
          placeholder='password'
          onChangeText={password => this.setState({password})}
        />
        <View style={styles.actions}>
          <Button
            title='Login'
            onPress={this.submitForm}
            style={styles.button}
          />

        </View>
      </View>
    );
  }

  //Attempts logging in
  submitForm = () => {
    this.fetchStatus();
    if(this.state.loggedIn){
      this.login();
    }else{
      console.log('Failed');
    }
  };

  initializeUser = (response) =>{
    fetch('http://10.0.2.2:3000/login/'+ this.state.username+'-'+this.state.password)
    .then(response =>  response.json())
    .then(json => this.setState({response:json})).catch(function(error){
        return;
      });
  }

  //Sends login data to backend
  fetchStatus = () => {
    fetch('http://10.0.2.2:3000/login/'+ this.state.username+'-'+this.state.password)
    .then(response =>  {
        if(response.status == 200 ){
          this.setState({loggedIn:true});
          this.initializeUser(response);
          return;
        } else{
          return false;
        }
      }).catch(function(error){
        return false;
      });
  }

  //Calls parent login
  login = (userInfo) => {
    userInfo = this.state.username;
    this.props.login(userInfo);
  }
}



const styles = StyleSheet.create({
  container:{
    top: 50,
    alignContent: 'center',
    height:600
  },
  button:{
    marginBottom:10
  }
});
