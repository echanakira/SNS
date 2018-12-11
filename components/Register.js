import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';


export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email:'',
      registered:false,
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

        <TextInput
          //ref={ref => (this.passwordInput = ref)}
          value={this.state.email}
          placeholder='password'
          onChangeText={email => this.setState({email})}
        />

        <View style={styles.actions}>
          <Button
            title='Register'
            onPress={this.submitForm}
            style={styles.button}
          />
          <Button
            title='Close'
            onPress={this.props.toggleRegister}
            style={styles.button}
          />
        </View>
      </View>
    );
  }

  //Attempts logging in
  submitForm = () => {
    console.log('Submitted Form');
    this.fetchStatus();
    if(this.state.loggedIn){
      this.login();
    }else{
      console.log('Failed');
    }
  };

  //Sends login data to backend
  fetchStatus = () => {
    fetch('http://10.0.2.2:3000/register/'+ this.state.username+'-'+this.state.password+'-'+this.state.email,
    {
  method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })}).then(response =>  {
        if(response.status == 200 ){
          return;
        } else{
          return false;
        }
      }).catch(function(error){
        return false;
      });
  }

  //Calls parent login
  loginPage = () => {
    this.props.toggleRegister();
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
