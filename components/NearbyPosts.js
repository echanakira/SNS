
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
          data:null,
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
    console.log('[NearbyPosts] data => ' + JSON.stringify(this.props.data));
    return (
      <View style={styles.listView}>
          <FlatList
          data={this.props.data}
          renderItem={({items})=>
          <TouchableOpacity onPress={this.props.toggleCard}>
            {console.log('[NEARBY] => ' + JSON.stringify(items.title))}

                <Text style={styles.title}> {JSON.stringify(items.title).toString()} </Text>

          </TouchableOpacity>
            }

          />
          <Button title='Close' onPress={this.props.handlePress} />
      </View>
    );
  }

   //Change to localhost


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
    color:'green'
  },
  post:{
    margin: 20,
    backgroundColor: 'silver',
  },
});
