
import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Button, Platform, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import Card from './Card'


//39.290386
//-76.612190
type Props = {};
export default class NearbyPosts extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
          data:['Hello'],
          isCardActive:false,
          category:'University',
        };
     }


     // renderItem={({item:message}) =>
     //   <TouchableOpacity onPress={this.displayCard()}>
     //     <Text> {message.message} </Text>
     //   </TouchableOpacity>
     // }

  render() {
    if(!this.props.isActive){
      return null;
    }
    this.getNearbyMessages();
    return (
      <View style={styles.listView}>
          <FlatList
          data={[{mid:'The other team had only four active players, The other team had only four active players, The other team had only four active players, The other team had only four active players'},{mid:'hello 2'},{mid:'hello 2'}]}
          renderItem={({item}) =>
          <TouchableOpacity onPress={this.props.toggleCard}>
            <Text style={styles.title}> {item.mid} </Text>
          </TouchableOpacity>
            }

          />
          <Button title='Close' onPress={this.props.handlePress} />
      </View>
    );
  }

   //Change to localhost
  getNearbyMessages = () => {
    console.log('Fetching Messages');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => { this.setState({data: [{message:'Message 1'}]})});
  }

  displayCard = () =>{
    this.props.handlePress();
    //remove post from FlatList
    //show card
    this.setState({isCardActive : !this.state.isCardActive});
  }

}

const styles = StyleSheet.create({
  listView:{
    margin: 10,
    width: 390,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title:{
    backgroundColor: 'lightblue',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    fontWeight:'bold',
  },
  post:{
    margin: 20,
    backgroundColor: 'silver',
  },
});
