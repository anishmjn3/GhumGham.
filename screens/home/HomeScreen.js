import React, { Component } from 'react';
import 
{ Modal, 
  Platform, 
  TouchableHighlight, 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,ListView } 
  from 'react-native';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import wikiApi from './api';

import Detailscreen from './details' 

import cameraicon from './cameraicon.png';
// import HTML from 'react-native-render-html';
import galleryicon from './galleryicon.png'; 
import AboutUsScreen from './../AboutScreen';

let tflite = new Tflite();

const height = 350;
const width = 350;
const blue = "#25d5fd";
const mobile = "Pick an image";
var searchTerm='';
console.disableYellowBox = true;
type Props = {};

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./galleryicon.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends Component<Props> {
  // static navigationOptions = {
  //  header: navigation => ({
  //   style: {
  //     backgroundColor: '#000000',
  //   }
  // })

// }
// static navigationOptions = {
//   headerTitle: <LogoTitle />,
//   headerRight: (
//     <Button
//       onPress={() => {this.props.navigation.navigate('AboutUS')}}
//       title="Info"
//       color="#fff"
//     />
//   ),
// };

  constructor(props) {
    super(props);
    this.state = {
      model: null,
      source: null,
      imageHeight: height,
      imageWidth: width,
      recognitions: [],
      search: false,
			article: {
				title: 'Searching...',
				content: 'Please wait',
			},
			term: props.searchTerm,
    };

    if (!this.state.search) {
			this.state.search = true;
			this.getContent();
		}
  }

  onSelectModel(model) {
    this.setState({ model });
    
        var modelFile = 'models/graph.lite';
        var labelsFile = 'models/labels.txt';
    
    tflite.loadModel({
      model: modelFile,
      labels: labelsFile,
    },
      (err, res) => {
        if (err)
          console.log(err);
        else
          console.log(res);
      });
    // searchTerm={res["label"]};
  }

  componentWillMount(){
    this.onSelectModel('model');
  }

  onSelectCamera() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        var w = response.width;
        var h = response.height;
        this.setState({
          source: { uri: path },
          imageHeight: h * width / w,
          imageWidth: width
        });

            tflite.runModelOnImage({
              path,
              imageMean: 128.0,
              imageStd: 128.0,
              numResults: 3,
              threshold: 0.05
            },
              (err, res) => {
                if (err)
                  console.log(err);
                else
                  this.setState({ recognitions: res });
              });
        
      }
    });
  }

  onSelectGallery() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        var w = response.width;
        var h = response.height;
        this.setState({
          source: { uri: path },
          imageHeight: 350,
          imageWidth: 350
        });

            tflite.runModelOnImage({
              path,
              imageMean: 128.0,
              imageStd: 128.0,
              numResults: 3,
              threshold: 0.05
            },
              (err, res) => {
                if (err)
                  console.log(err);
                else
                  this.setState({ recognitions: res });
              });
        
      }
    });
  }

  renderBoxes() {
    const { model, recognitions, imageHeight, imageWidth } = this.state;
      return recognitions.map((res, id) => {
        
        if(res["label"]=="ghanta ghar kathmandu ")
        {searchTerm = "Ghanta Ghar (Kathmandu)" }
        else{
          if ((res["confidence"] * 100).toFixed(0)>50)
              searchTerm = this.titleCase( res["label"]);
          else
            searchTerm = "Unable to Recognize";
        }return (
          
          
          <Text key={id} style={{ color: 'black'}}>
            {/* {res["label"] +(res["confidence"] * 100).toFixed(0) } */}
          </Text>
          
        )
      });
    
  }

  getContent() {
		let term = searchTerm;
		wikiApi(term).then(
	      (article) => {
	        if(!article.title) {
        		article = {
					title: 'No article found',
					content: 'Please search for a new term...',
				};
	        }
	        this.setState({
				article: article,
			});
	      }
	    );
  }
  
  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
  
  render() {
    var { model, source, imageHeight, imageWidth } = this.state;
    var renderButton = (m) => {
      return (
        <View>
          <View style={{padding:15}}>
        <TouchableOpacity 
        onPress={this.onSelectCamera.bind(this)}
        >
           <Image source={cameraicon} style={styles.icon}/>
          
          <Text style={{fontWeight:'bold', fontSize:15, color:'#000000'}}>Camera</Text>
        </TouchableOpacity>
        </View>
        <View style={{padding:15}}>
          <TouchableOpacity 
          onPress={this.onSelectGallery.bind(this)}
         >
             <Image source={galleryicon} style={styles.icon}/>
            
             <Text style={{fontWeight:'bold',fontSize:15,color:'#000000'}}>Gallery</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
    }


    return (
      <View style={styles.container}>
        {source ?
        <View>
          <View>

            </View>
          {/* <TouchableOpacity style={
            [styles.imageContainer, {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2
            }]} onPress={this.onSelectCamera.bind(this)}> */}
            
              <View style={
            [styles.imageContainer, {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2
            }]}>
                <Image source={source} style={{
                  height: imageHeight, width: imageWidth
                }} resizeMode="contain" /> 
                


                </View>
                
            <View 
            style={styles.boxes}
            >
              {this.renderBoxes()}
              </View>
              <View>
             
               
          
            </View>
            {/* </TouchableOpacity> */}
            <View>
            <Text style={{marginTop: 10, marginBottom: 15, fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
               
            {searchTerm}</Text>
            </View>
            <View style={styles.detailbutton}>

              
             <Button
              style={[styles.button]}
             title="More Info"
             onPress={() => 
               /* 1. Navigate to the Details route with params */
               this.props.navigation.navigate('Details',{
                // id: 'ResultsView',
                // name: 'Results',
                searchTerm: searchTerm,
              })
             }
           />
            <View style={{padding: 15}}>

           <Button 
            title="Back"
            onPress={()=> {this.setState({source:null})}}
           />
           </View>
           </View>
            </View>
            :
            <View>
            {renderButton(mobile)}
            
          </View>
        }
      </View>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Detailscreen,
    AboutUs:AboutUsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB'
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: "center"
  },
  text: {
    color: blue
  },
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
  buttonText: {
    color: 'white',
    fontSize: 15
  },
  box: {
    // position: 'absolute',
    // flex: 1,
    borderColor: blue,
    borderWidth: 2,
  },
  boxes: {
    // position: '',
    // flex:1,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  icon:{
    height:50,
    width:50
  },
  detailbutton:{
    padding:25
  },
  namedet:{
    
    padding:15,
    
  }
});


