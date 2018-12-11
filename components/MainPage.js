import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Input, TextInput } from 'react-native';
import Map from './Map.js';
import NearbyPosts from './NearbyPosts';
import Card from './Card';
import Settings from './Settings';
import Prompt from './Prompt.js';

//Main page will  have a Map overlayed with Markers and whenever a Marker is pressed, a card will appear
export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isNearbyActive:false,
      isSettingsActive:false,
      isCardActive:false,
      isSettingsActive:false,
      isPromptActive:false,
      postData:null,
    }
    this.togglePosts = this.showPosts.bind(this)
    this.togglePosts2 = this.showPosts2.bind(this)
    this.togglePrompt = this.showPrompt.bind(this)
    this.toggleCard = this.showCard.bind(this);
  //  this.data = this.postData.bind(this);
  }

  showPrompt = () =>{
    this.setState( state => ({isPromptActive : !this.state.isPromptActive}))
  }

  showPosts = () => {
    this.setState( state => ({isNearbyActive : !this.state.isNearbyActive}))
  }

  showPosts2 = (data) => {
    this.setState( state => ({isPromptActive : !this.state.isPromptActive}))
    this.getNearbyMessages(data);
    this.setState( state => ({isNearbyActive : !this.state.isNearbyActive}))
  }

  showCard = () => {
    this.setState( state => ({isCardActive : !this.state.isCardActive}))
  }

  showSettings = () =>{
    this.setState( state => ({isSettingsActive : !this.state.isSettingsActive}))
  }


  render() {
     if(!this.props.isActive){
      return null;
    }
    return (
      <View style={styles.main}>
      <Map />
        <View style={styles.topPanel}>
        <TouchableOpacity style={styles.icon} onPress={this.showPrompt}>
          <Text> Nearby </Text>
        </TouchableOpacity>
        <Text style={styles.name}> {this.props.userInfo} </Text>
          <TouchableOpacity onPress={this.showSettings} style={styles.settings}>
            <Text> Settings </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Prompt togglePrompt={this.togglePrompt} togglePosts2={this.togglePosts2} onPress={this.showPrompt} isActive={this.state.isPromptActive}/>
          <NearbyPosts data={this.state.postData} isActive={this.state.isNearbyActive} handlePress={this.togglePosts}/>
          <Card isActive={this.state.isCardActive} toggleCard={this.toggleCard}/>
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

  getNearbyMessages = (data) => {
    fetch('http://10.0.2.2:3000/message/'+data.category+'-'+data.date+'-'+data.latitude+'-'+data.longitude)
    .then(response => response.json())
    .then(json =>json.result.rows)
    .then(list =>  {
      temp2 = new Array()
      item = list;
      list = item[0];
      item = list[0];
      temp2 = list[1];
      temp = new Array()
      temp.push({item});
      obj = {title:temp[0], message:temp2}
      console.log('[TEMP] temp = ' + JSON.stringify(obj));
      this.setState({postData: obj});
    }).catch(function(error){
      return false;
    });
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
