import * as React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

//When a Marker is clicked the Card will become active and the card will be populated by a message
export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message:'',
      publisher: ''
    };
  }

  render() {
    if(!this.props.isActive){
        return null;
    }
    this.displayMessage();
    return (
      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.name}> {this.state.publisher.split('"').join('')} </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <Text style={styles.message}>
            {this.state.message.split('"').join('')}
          </Text>
          <TouchableOpacity
            style={{
               flexDirection: 'row',
               justifyContent: 'center',
               marginLeft: 150,
               width: 50
             }}
             onPress={() => this.props.closeCard()}
          >
            <Text
              style={{
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#d6d7da',
                backgroundColor: '#DCDCDC'
              }}
            > Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

   //Change to localhost
  displayMessage1 = () => {
    console.log('Fetching Message in Card');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => { this.setState({message: (JSON.stringify(json.movies))})});
  }

  displayMessage = () => {
    console.log('Fetching Message in Card');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => json.movies)
    .then(movies => this.setState({message: (JSON.stringify(movies[0].title)),
    publisher:(JSON.stringify(movies[0].id))}));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 120,
    margin: 25
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  message: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: 344,
    height: 200,
    justifyContent: 'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'lightblue'
  },
});
