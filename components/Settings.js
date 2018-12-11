import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

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
      <View style={styles.container}>
        <View style={styles.settings}>
          <Text style={styles.title}> Settings </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1.5,
            }}
          />
          <TouchableOpacity style={styles.opacity}>
            <Text style={styles.text} > Set Coords </Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.opacity}>
              <Text style={styles.text}> Set Categories </Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.opacity}>
              <Text style={styles.text}> Archives </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.opacity}>
            <Text style={styles.text}> Delete Account </Text>
          </TouchableOpacity>

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
