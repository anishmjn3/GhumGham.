
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';



type Props = {};
export default class AboutUsScreen extends Component<Props> {
  static navigationOptions = {
     header: navigation => ({
      style: {
        backgroundColor: '#000000',
      }
    })}
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
        <Text style={styles.welcome}>GhumGham is a Travel App Based on Image Recognition.It helps Traveller to Recognize and get the Information of the Landmarks they took picture of through this app.</Text>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  heading:{
    fontSize: 30,
    textAlign: 'center',
    fontWeight:'bold'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
