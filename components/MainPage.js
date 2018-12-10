import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Input, TextInput } from 'react-native';
import Map from './Map.js';
import Card from './Card'

//Main page will  have a Map overlayed with Markers and whenever a Marker is pressed, a card will appear
export default class MainPage extends React.Component {
  render() {
     if(!this.props.isActive){
      return null;
    }
    return (
      <View style={styles.main}>
      <Map />
        <View style={styles.topPanel}>
          <Text style={styles.name}> Elijah </Text>
          <TouchableOpacity style={styles.settings}>
            <Text> Settings </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Card isActive={false}/>
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
    textAlign:'left',
    fontSize: 20,
    position: 'relative',
    marginLeft: 5,
  },
  settings:{
    fontSize: 18,
    marginLeft: 60,
  },
  input:{
    borderColor:'black',
  },
});
