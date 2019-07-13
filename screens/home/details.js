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
import wikiApi from './api';

import HTML from 'react-native-render-html';


class Detailscreen extends Component {
    static navigationOptions = {
        
    }

    constructor(props) {
		super(props);
		// let ds = new ListView.DataSource({
	    //     rowHasChanged: (row1, row2) => row1 !== row2,
        // });
        var searchTerm = this.props.navigation.getParam('searchTerm','noid');
   
		this.state = {
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
    
    getContent() {
        var searchTerm = this.props.navigation.getParam('searchTerm','boudhanath');
        let term =  searchTerm;
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


    render() {
        
    var searchTerm = this.props.navigation.getParam('searchTerm','noid');
    
        return (
            <View style={styles.container}>
                {/* <Text>Details</Text> */}
                {/* <Text>{searchTerm}</Text> */}
               <Text style={{marginTop: 10, marginBottom: 15, fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                {this.state.article.title}
              </Text>
              <ScrollView style={{marginLeft:10, marginRight: 10, textAlign:'justified'}}>
              <HTML
                  html={this.state.article.content}
        
              />
     
          </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ADD8E6'
    }
})


export default Detailscreen;