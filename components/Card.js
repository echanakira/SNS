import * as React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

//When a Marker is clicked the Card will become active and the card will be populated by a message
export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.'
    };
  }

  render() {
    if(!this.props.isActive){
        return null;
    }
    return (
      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.name}> [Name] </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            }}
          />
          <Text style={styles.message}>
            {this.state.message}
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
          <Button
            title='Press'
            onPress={this.displayMessage()}
          
          />
        </View>
      </View>
    );
  }

   //Change to localhost
  displayMessage = () => {
    console.log('Fetching');
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(json => { this.setState({message: (JSON.stringify(json.movies))})});
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 120,
    backgroundColor: '#ecf0f1',
    margin: 8
  },
  name: {
    fontStyle: 'normal',
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
  },
});
