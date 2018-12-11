import * as React from 'react';
import {CheckBox, ScrollView, FlatList, Button,Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Categories extends React.Component {

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
        <Text style={styles.title}> Set Categoy </Text>
        <FlatList
          data={[{mid:'Category 1'},{mid:'Category 2'}]}
          renderItem={({item}) =>
          <View >
            <CheckBox style={styles.mid} value={false} />
            <Text style={{}}> This is a Checkbox </Text>

          </View>
        }
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
    textAlign:'left',
    display:'flex',
    flexDirection:'row',
  }
});
