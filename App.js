import React from 'react';
import {
  createSwitchNavigator, 
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from './screens/home/HomeScreen';
import StartupScreen from './screens/StartupScreen';
import MapScreen from './screens/MapScreen';
import AboutUsScreen from './screens/AboutScreen';


const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Maps:{screen: MapScreen},
   AboutUs : {screen: AboutUsScreen}
  },
);

const RootStack = createSwitchNavigator(
    {
      Home:{screen:StartupScreen},
      Next: {screen:TabNavigator}
      },
    {
        initialRouteName:'Home',
        
    }
);
  


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
render() {
   return <AppContainer />;
    
  }
}
