import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Alert
}
  from 'react-native';
import React from 'react';
import RadialGradient from 'react-native-radial-gradient';


export default class StartScreen extends React.Component {

  componentWillMount() {
    setInterval(() => {
      this.props.navigation.navigate('Stackk');
    }, 1500);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <ImageBackground 
          source={require('./logo.png')} 
          style={styles.backgroundstyle}
          resizeMode='cover'
            > */}
          <RadialGradient style={styles.backgroundstyle}
            colors={['#ADD8E6', '#317287']}
            stops={[0.01, .92]}
            radius={Dimensions.get('screen').width}
          >
            <Image source={require('./logo.png')} style={styles.image} />
            <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                fontSize: Dimensions.get('window').height * 0.05,
                fontWeight: 'bold',
                color: '#ffdead',
                textAlign: 'center'
              }}>
                
              </Text>
              <Text style={{
                fontSize: Dimensions.get('window').height * 0.02,
                fontWeight: 'bold',
                color: '#ffdead',
                textAlign: 'center'
              }}
              >
                </Text>
              <ActivityIndicator size='large' />
            </View>
          </RadialGradient>
        {/* </ImageBackground> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundstyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '20%',
    width: '60%'
  },

});
