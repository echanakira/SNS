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

//39.290386
//-76.612190
type Props = {};
export default class CustomMarker extends Component<Props> {
    constructor(props) {
      console.log('Creating Custom');
        super(props);

        this.state = {
             marker:{
               coordinate:{
                 latitude: 33.653390,
                 longitude: -84.449500,
               },
               title:'College Park',
               description:'UMD',
             }
        };
     }



  render() {
    console.log('Displaying Custom Marker');
    return (
      <Marker
        coordinate={this.state.marker.coordinate}
        title={this.state.marker.title}
        description={this.state.marker.description}
        isActive={this.props.isActive}
        style={styles.marker}
      />
    );
  }

  longitudeHandler = (typedText) => {
      this.setState({long: parseFloat(typedText) })
   }

   latitudeHandler = (typedText) => {
        this.setState({lat: parseFloat(typedText)})
   }

   populate = () => {
     console.log('Populating');
     fetch('https://facebook.github.io/react-native/movies.json')
     .then(response => response.json())

   }

   //Change to localhost
  displayMessage = () => {
    console.log('Fetching Marker');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => { this.setState({message: (JSON.stringify(json.movies))})});
  }
}

const styles = StyleSheet.create({
  marker:{
    position:'absolute'
  }
});
