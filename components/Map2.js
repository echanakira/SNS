/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import CustomMarker from './CustomMarker.js';

//39.290386
//-76.612190
type Props = {};
export default class Map2 extends Component<Props> {
    constructor(props) {
      console.log('Creating Map');
        super(props);
        // marker =
        this.state = {
            lat: 33.653390,
            long: -84.449500,
            userLong: '',
            userLat: '',
            loaded:false,
             markers: [{
               coordinate:{
                 latitude: 33.653390,
                 longitude: -84.449500,
               },
               title:'College Park',
               description:'UMD'
             }],
             isActive: false,
             rendered:null,
        };

     }


     loadMarker = () => {
       console.log('Loading');
       rendered = <CustomMarker isActive={true} />;
       //this.setState({ rendered: (<CustomMarker isActive={true} />)});
       return rendered;
     }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
            initialRegion = {{
              latitude: this.state.lat,
              longitude: this.state.long,
              latitudeDelta: 80,
              longitudeDelta: 80
            }}
            onMapReady={this.loadMarker}
            />
           {this.loadMarker()}
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   // position: 'absolute',
   // top: 0,
   // left: 0,
   // bottom: 0,
   // right: 0,
   // justifyContent: 'flex-end',
   // alignItems: 'center'
   flex: 1
  },
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  marker:{
    position:'absolute',
  },
  longitude:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    left: '50%',
    position: 'absolute'
  },
  latitude:{
      height: 40,
      borderColor: 'blue',
      borderWidth: 1,
      right: '50%',
      position: 'absolute'
    }
});
