import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Archives from './Archives.js';
import Categories from './Categories.js';

export default class Settings extends React.Component {

//Pass a change co-ordinates handles
  constructor(props) {
    super(props);
    this.state={
      isArchivesActive: false,
      isCategoriesActive:true,
    }
  }

  toggleArchive = () =>{
    this.setState( state => ({isArchivesActive : !this.state.isArchivesActive}))
  }

  toggleCategories = () =>{
    this.setState( state => ({isCategoriesActive : !this.state.isCategoriesActive}))
  }

  render() {
    if(!this.props.isActive){
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.settings}>
          <Text style={styles.title}> Settings </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1.5,
            }}
          />

          <TouchableOpacity onPress={this.toggleCategories} style={styles.opacity}>
              <Text style={styles.text}> Set Categories </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleArchive} style={styles.opacity}>
              <Text style={styles.text}> Archives </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.opacity}>
            <Text style={styles.text}> Delete Account </Text>
          </TouchableOpacity>
          <Archives isActive={this.state.isArchivesActive} />
          <Categories isActive={this.state.isCategoriesActive} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 270,
    marginLeft: 30,

  },
  settings:{
    backgroundColor: 'white',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'lightblue',
    height: 500,
    width: 345,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    marginLeft: 120
  },
  text:{
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  opacity:{
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    width: 100
  }
});
