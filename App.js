import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import {Transition} from 'react-native-reanimated';
import StartScreens from './screens/StartScreen';
import Stackk from './screens/Stack';
// import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

const AppNavigator = createStackNavigator({
  Home: {
    screen: StartScreens,
    navigationOptions: {
      headerShown: false
    }
  },
  Stackk: {
    screen: Stackk,
    navigationOptions: {
      headerShown: false,
    }
  },
});

const AppContainer= createAppContainer(AppNavigator);
export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}