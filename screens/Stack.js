import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import {} from 'react-navigation-animated-switch';
// import { Transition } from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CustomSidebarMenu from './CustomSidebarMenu';
import HomeScreen from './MainScreen';
import DetailScreen from './details';
import AboutUsScreen from './AboutUS/Aboutus';
import PrivacyPolicayScreen from './AboutUS/PrivacyPolicy';

global.currentScreenIndex = 0;


const StackScreen = createStackNavigator({
    Home: { screen: HomeScreen },
    Details: { screen: DetailScreen },
},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#191970',
            },
            headerTintColor: "#fff",
            color: 'red',
            animationEnabled: false,
        },

    },


)


const Drawer = createDrawerNavigator({
    Main: { screen: StackScreen },
    AboutUs: { screen: AboutUsScreen },
    PrivacyPolicy: { screen: PrivacyPolicayScreen }
},
    {
        contentComponent: CustomSidebarMenu,
        hideStatusBar: false,
        keyboardDismissMode: 'none',
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
        drawerType: 'slide'
    }
)

const AppContainer = createAppContainer(Drawer);
// export default createAppContainer(Drawer)
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
