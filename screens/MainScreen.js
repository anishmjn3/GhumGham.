import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Button
}
    from 'react-native';
// import { ImageCrop } from 'react-native-image-cropper'
import { Header } from 'react-native-elements';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';

import cameraicon from './cameraicon.png';
import galleryicon from './galleryicon.png';

let tflite = new Tflite();

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const blue = "#ffffff";
// const mobile = "Pick an image";
var searchTerm = '';

var recognize = [''];
var recognizepercent = ['0']
console.disableYellowBox = true;



export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: null,
            source: null,
            imageHeight: height,
            zoom: 0,
            imageWidth: width,
            recognitions: [],
            search: false,
            article: {
                title: 'Searching...',
                content: 'Please wait',
            },
            term: props.searchTerm,
        };
        this.onSelectModel('model');
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: "Home",
            headerLeft: () => {
                return (
                    // <Text onPress={()=>navigation.openDrawer()} style={{color:"#FFFFFF"}}>=</Text>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={require('./Menu2.png')}
                            style={{ height: 20, width: 50 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                );
            }

        };
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
                    source: { uri: response.uri },
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
                // var path = 'file://'+response.uri;
                var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
                var w = response.width;
                var h = response.height;
                this.setState({
                    source: { uri: response.uri },
                    imageHeight: 350,
                    imageWidth: 350
                });
                console.log(path)
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
                    }
                );

            }
        });
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

    renderBoxes() {
        const { model, recognitions, imageHeight, imageWidth } = this.state;
        var i = 0;
        return recognitions.map((res, id) => {
            if (res["label"] == "ghanta ghar kathmandu ") { 
                recognize[i] = "Ghanta Ghar (Kathmandu)" 
            }
            else {
                if ((res["confidence"] * 100).toFixed(0) > 50)
                    recognize[i] = this.titleCase(res["label"]);
                else
                    recognize[i] = "Unable to Recognize";
            } 
            return (


                <Text key={id} style={{ color: 'black' }}>
                    {/* {res["label"] +(res["confidence"] * 100).toFixed(0) } */}
                </Text>

            )
            // recognize[i] = res["label"];
            // recognizepercent[i] = (res["confidence"] * 100).toFixed(0)
            i++;
        });



    }


    render() {
        var { model, source, imageHeight, imageWidth } = this.state;

        var resultScreen = () => {
            return (
                <View >

                    <View style={[styles.galleryinbutton]}>
                        <TouchableOpacity
                            onPress={this.onSelectCamera.bind(this)}
                            style={[styles.gallertbutton, styles.styleborder]}
                        >
                            <Image source={cameraicon} style={styles.icon} />
                            <Text style={styles.textcgs}>Scan from Camera</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.galleryinbutton}>
                        <TouchableOpacity
                            onPress={this.onSelectGallery.bind(this)}
                            style={[styles.gallertbutton, styles.styleborder]}
                        >
                            <Image source={galleryicon} style={styles.icon} />

                            <Text style={styles.textcgs}> Pick from Gallery</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            );
        }


        return (
            <View style={styles.container}>
                {source ?
                    <View style={styles.centerAlign}>

                        <View style={{ height: height * 0.04, width: 300 }}>

                        </View>
                        <View style={[styles.centerAlign, styles.imagecontainer]}>
                            <Image source={this.state.source} style={styles.imagecontainer} resizeMode="contain" />
                        </View>
                        {this.renderBoxes()}
                        <View style={[styles.resultstyle, styles.centerAlign]}>
                            <Text style={styles.textresult}>
                                {recognize[0]}
                            </Text>
                            <Text style={styles.textresult}>
                                {/* {recognizepercent[0] + "%"} */}
                            </Text>
                        </View>

                        <View style={[styles.buttonstyles, styles.centerAlign]}>
                            <View style={[styles.button, { backgroundColor: 'grey', borderRadius: 7, margin: height * 0.005 }]}>
                                <TouchableOpacity
                                    style={[styles.button, styles.styleborder2, styles.centerAlign]}
                                    onPress={() =>
                                        this.props.navigation.navigate('Details', {
                                            searchTerm: recognize[0],
                                        })
                                    }
                                >
                                    <Text style={[styles.textresult, { color: '#fff' }]}>Details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.button, { backgroundColor: 'grey', borderRadius: 7, margin: height * 0.005 }]}>
                                <TouchableOpacity
                                    style={[styles.button, styles.styleborder2, styles.centerAlign]}
                                    onPress={() => { this.setState({ source: null }) }}>
                                    <Text style={[styles.textresult, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>

                    :

                    <View>
                        {resultScreen()}
                    </View>

                }
            </View>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ADD8E6'
    },
    centerAlign: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        // padding: 7,
        width: width * 0.4,
        height: height * 0.06,

    },
    imagecontainer: {
        height: height * 0.43,
        width: width * 0.9,
        // backgroundColor: 'red'
    },
    resultstyle: {
        height: height * 0.135,
        width: width * 0.8,
    },
    icon: {
        height: 60,
        width: 60,
        alignSelf: 'center',
    },
    buttonstyles: {
        // padding: 25
        // backgroundColor: 'red',
        height: height * 0.13,
        width: width * 0.5
    },
    textcgs: {
        marginTop: 10,
        // marginBottom: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textresult: {
        fontSize: height * 0.023,
        fontWeight: 'bold',

        margin: 3
    },
    gallertbutton: {
        flexDirection: "row",
        height: height * 0.1,
        width: width * 0.6,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        // bot
    },
    galleryinbutton: {
        // padding:10,
        height: height * 0.1,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 15
    },
    styleborder: {
        borderBottomColor: 'grey',
        borderRadius: 15,
        borderBottomWidth: 3,
        borderRightColor: 'grey',
        borderRightWidth: 3,
        borderLeftWidth: 3,
        borderLeftColor: 'white'
    },
    styleborder2: {
        borderBottomColor: 'grey',
        borderRadius: 7,
        borderBottomWidth: 2,
        borderRightColor: 'grey',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderLeftColor: 'blue'
    },
    recommendstyle: {
        flexDirection: 'row',
        height: height * 0.13,
        width: height * 0.13,
        // backgroundColor: 'white',
        // borderColor: 'grey',
        // borderWidth: 1,
        marginTop: height * 0.004,
        margin: height * 0.005,
        // opacity:0.65

    }
});
