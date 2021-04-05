//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions } from 'react-navigation'


const imagearray = {
    HomeIcon: require('./HomeIcon.png'),
    AboutUsIcon: require('./AboutUSIcon.jpg')
}

export default class CustomSidebarMenu extends Component {
    constructor() {
        super();
        //Setting up the Main Top Large Image of the Custom Sidebar
        this.items = [
            {
                navOptionThumb: 'HomeIcon',
                navOptionName: 'Home',
                screenToNavigate: 'Main',
            },
            {
                navOptionThumb: 'AboutUsIcon',
                navOptionName: 'About us',
                screenToNavigate: 'AboutUs',
            },
            {
                navOptionThumb: 'AboutUsIcon',
                navOptionName: 'Privacy Policy',
                screenToNavigate: 'PrivacyPolicy',
            }
        ];
    }
    render() {
        const popAction = StackActions.popToTop()
        return (
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <Image
                    source={require('./logo.png')}
                    style={styles.sideMenuProfileIcon}
                />
                {/*Divider between Top Image and Sidebar Option*/}
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#e2e2e2',
                        marginTop: 15,
                    }}
                />
                {/*Setting up Navigation Options from option array using loop*/}
                <View style={{ width: '100%' }}>
                    {this.items.map((item, key) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginBottom: 2,
                                borderColor: '#fcd497',
                                height: 55,
                                backgroundColor: '#57b5d4',
                            }}
                            key={key}
                            onPress={() => {
                                global.currentScreenIndex = key;
                                // this.props.navigation.dispatch(popAction);
                                this.props.navigation.navigate(item.screenToNavigate);
                                this.props.navigation.closeDrawer();

                            }}

                        >
                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Image
                                    source={imagearray[item.navOptionThumb]}
                                    style={{ height: 25, width: 25 }}
                                    resizeMode='contain'
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        //   color: global.currentScreenIndex === key ? 'red' : 'black',
                                    }}
                                >
                                    {item.navOptionName}
                                </Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#fff' }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#fff',
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
        paddingTop: 20,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        // borderRadius: 150 / 2,
    },
});