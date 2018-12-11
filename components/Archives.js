import * as React from 'react';
import {ScrollView, FlatList, Button,Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Archives extends React.Component {

//Pass a change co-ordinates handles
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    if(!this.props.isActive){
      return null;
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Archives </Text>
        <FlatList
          data={[{mid:'The other team had only four active players, The other team had only four active players, The other team had only four active players, The other team had only four active players'},{mid:'hello 2'},{mid:'hello 2'}]}
          renderItem={({item}) =>
          <TouchableOpacity >
            <Text style={styles.mid}> {item.mid} </Text>
        </TouchableOpacity> }
        style={styles.messages}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    textAlign:'center',
  },
  mid:{
    backgroundColor: 'lightblue',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    fontWeight:'bold',
  },
  title:{
    top:0,
    fontWeight:'bold',
    fontSize:20,
    paddingLeft: 120,
    borderBottomColor: 'white',
    borderBottomWidth: .7,
    backgroundColor: '#C4C4C4',

  },
  messages:{
    top:0,
  }
});
