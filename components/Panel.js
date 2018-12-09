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
type Props = {};
export default class Panel extends Component<Props> {
    constructor(props) {
        super(props);
     }


  render() {
    return (
      <View>
        <Text> This is a Pane </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container2: {
    backgroundColor: 'silver',
    top: 0,
    left: 0,
    height: 100,
  },
  container3: {
    backgroundColor: 'silver',
    top: 450,
    height: 100,
  },
});
