import React from 'react';
import { Text, View,Image, Button, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';

export default class StartupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true,
    };
  }


  componentWillMount()
  {
        setInterval(() => {
          this.props.navigation.navigate('Next');
        },5000);
  }

  render() {
    return(
      <View 
        style={{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#87CEEB' 
        }}>

        <View>
          <Image style={styles.logo12} source={require('./logo.png')} />
          {/* <Text style= {styles.headingcode}>Ghum Gham</Text> */}
        </View>

        <View>
        <ActivityIndicator size="large" />
          {/* <Progress.Bar
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            width={200}
          /> */}
        </View>


         
      </View>
        
      );
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 7,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      // overflow: 'hidden',
      padding: 10,
      width:150,
      // flex: 0.5,
      textAlign:'center',
    },
    logo12:{
      height:150,
      width:200
    },
    headingcode:{
      fontSize:18,
      fontWeight:'bold',
      textAlign:'center'
    },
    normalfont:{
      fontSize:12,
      textAlign:'center'
    },
    progress: {
      margin: 10,
    },
  })
  