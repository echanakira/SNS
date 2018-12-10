import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
          onSubmitEditing={console.log(this.state.username)}
        />
        <View style={styles.actions}>
          <Button
            title='Login'
            onPress={() => {
            // this.submitForm();
            //console.log(this.props.login())
            this.props.login();
            }}
            style={styles.button}
          />

        </View>
      </View>
    );
  }

  // <Button
  // title='Register'
  // />

  submitForm = () => {
    if(this.fetchStatus){
      this.login();
    }else{
      console.log('Failed');
    }
  };

  //Change to localhost
  fetchStatus = () => {
    console.log('Fetching');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response =>  {
        if(response.status == 200){
          return true;
        } else{
          return false;
        }
      })
  }

  login = () => {
    this.setState({
      isActive:false
    })
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
