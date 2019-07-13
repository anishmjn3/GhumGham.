import React from 'react';
import {View,StyleSheet,Button,Dimensions,Text,Platform} from 'react-native';
import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import haversine from 'haversine'
var region= {
  latitude: 27.7000 ,
  longitude: 85.2891,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const origin = {latitude: 27.7000 ,
  longitude: 85.2891,};
const destination = {latitude: 27.7000 ,
longitude: 85.391,};
const LATITUDE=28.7000;
const LONGITUDE=85.391;

export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log("You can use the location")
      // alert("You can use the location");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}
class MapsScreen extends React.Component{
 
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: {
       latitude: LATITUDE,
       longitude: LONGITUDE
      }
    };
  }

  async componentWillMount() {
    await requestLocationPermission()
    }

 
    
    render(){
      
      return(
          <View style={styles.container}>

                  <MapView
                      style={styles.map}
                      initialRegion= {region}
                      showsUserLocation={true}
            >
             
          
            {/* <Button title='anish'/> */}
      </MapView>
      
      <Text> {this.state.latitude} </Text>
        <Text> {this.state.longitude} </Text>
        <Text> {this.state.error} </Text>

        {/* <Text >
      {parseFloat(this.state.distanceTravelled).toFixed(4)} km
    </Text> */}
          </View>
     );
    }

}
const styles = StyleSheet.create({
  
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    button:{
      alignContent:'flex-end'
    }
    
  });

export default MapsScreen;