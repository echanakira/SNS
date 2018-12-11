
import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Button, Platform, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import Card from './Card'


//39.290386
//-76.612190
type Props = {};
export default class NearbyPosts extends Component<Props> {
    constructor(props) {
      console.log('Creating Custom');
        super(props);

        this.state = {
          data:[],
          isCardActive:false,
          category:'University',
        };
     }



  render() {
    if(!this.props.isActive){
      return null;
    }
    this.getNearbyMessages();
    return (
      <View>
        <ScrollView style={styles.post}>
          <FlatList
          data={this.state.data}
          renderItem={({item:message}) =>
            <TouchableOpacity onPress={this.displayCard()}>
              <Text> {message.message} </Text>
            </TouchableOpacity>
          }
          keyExtractor={item => item.message}
          />
          <Button title='Press' />
        </ScrollView>
      </View>
    );
  }

   //Change to localhost
  getNearbyMessages = () => {
    console.log('Fetching Messages');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => { this.setState({data: [{message:'Message 1'}, {message:'Message 2'},
      {message:'Message 3'}, {message:'Message 4'}, {message:'Message 5'}]})});
  }

  displayCard = () =>{
    //closeNearby
    this.props.handlePress();
    //remove post from FlatList
    //show card
    this.setState({isCardActive : !this.state.isCardActive});

  }

}

const styles = StyleSheet.create({
  marker:{
    position:'absolute'
  },
  post:{
    margin: 20,
    backgroundColor: 'silver',
  },
});
