import * as React from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet, Input, TextInput } from 'react-native';

import Prompt from './Prompt.js';

//Main page will  have a Map overlayed with Markers and whenever a Marker is pressed, a card will appear
export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      postData:{
        date:'2018-12-14 10:10',
        category:'ALL',
        latitude:'39',
        longitude:'-77'
      }
    }
  }

  render() {
    console.log(this.state.postData.category);
     if(!this.props.isActive){
      return null;
    }
    return (
      <View style={styles.main}>
            <TextInput
              style={styles.input}
              value={this.state.postData.category}
              onChangeText={(text) =>
                {
                cat = text;
                this.state.postData.category = cat;
                cat = this.state.postData;
                this.setState({postData: cat});}
              }
            />
          <TextInput
            style={styles.input}
            value={this.state.postData.date}
            onChangeText={(text) =>
              {
              date = text;
              this.state.postData.date = date;
              date = this.state.postData;
              this.setState({postData: date});}}
          />
          <TextInput
            style={styles.input}
            value={this.state.postData.latitude}
            onChangeText={(text) =>
              {
              lat = text;
              this.state.postData.latitude = lat;
              lat = this.state.postData;
              this.setState({postData:lat});}
            }
          />
          <TextInput
            style={styles.input}
            value={this.state.postData.longitude}
            onChangeText={(text) =>
              {
              long = text;
              this.state.postData.longitude = long;
              long = this.state.postData.longitude;
              this.setState({postData:long});}
            }
          />
          <View>
            <Button title='Submit' onPress={this.temp}/>
            <Button title='Cancel' onPress={this.props.togglePrompt}/>
          </View>

      </View>
    );
  }

  temp = () =>{
    console.log('[Prompt] postData =' + JSON.stringify(this.state.postData))
    this.props.togglePosts2(this.state.postData);
  }

}

//PopulatePage


const styles = StyleSheet.create({
    main:{
      backgroundColor:'white',
      margin: 50,
    }
  });
