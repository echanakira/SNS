import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Input, TextInput } from 'react-native';
import Map from './Map.js';
import NearbyPosts from './NearbyPosts';
import Card from './Card';
import Settings from './Settings';

//Main page will  have a Map overlayed with Markers and whenever a Marker is pressed, a card will appear
export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isNearbyActive:false,
      isSettingsActive:false,
    }
    this.togglePosts = this.showPosts.bind(this)
  }

  showPosts = () => {
    console.log(this.state.isNearbyActive);
    this.setState( state => ({isNearbyActive : !this.state.isNearbyActive}))
  }

  render() {
     if(!this.props.isActive){
      return null;
    }
    return (
      <View style={styles.main}>
      <Map />
        <View style={styles.topPanel}>
        <TouchableOpacity style={styles.icon} onPress={this.showPosts}>
          <Text> Nearby </Text>
        </TouchableOpacity>
        <Text style={styles.name}> {this.props.userInfo} </Text>
          <TouchableOpacity style={styles.settings}>
            <Text> Settings </Text>
          </TouchableOpacity>
        </View>

        <View>
          <NearbyPosts isActive={this.state.isNearbyActive} handlePress={this.togglePosts}/>
          <Card isActive={this.props.toggleCard}/>
          <Settings isActive={this.state.isSettingsActive}/>
        </View>

        <View style={styles.bottomPanel}>
          <TextInput
            style={styles.input}
            value='longitude'
          />
          <TextInput
            style={styles.input}
            value='latitude'
          />
        </View>
      </View>
    );
  }

}

//PopulatePage


const styles = StyleSheet.create({
  topPanel: {
    backgroundColor: 'white',
    top: 0,
    left: 0,
    height: 70,
    width:'100%',
    flexDirection:'row',
    shadowColor: 'black',
  },
  map:{
    top: 0,
    height:500
  },
  bottomPanel: {
    backgroundColor: 'white',
    marginTop: 520,
    height: 70,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  name:{
    textAlign:'center',
    fontSize: 30,
    marginLeft: 100
  },
  icon:{
    fontSize: 18,
    marginLeft: 5,
  },
  settings:{
    fontSize: 18,
    marginLeft: 95,
  },
  input:{
    borderColor:'black',
  },
});
