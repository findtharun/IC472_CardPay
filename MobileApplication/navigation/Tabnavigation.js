import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScreenOne from '../screens/Screenone';
import ScreenTwo from '../screens/Screentwo';
import ScreenFour from '../screens/Screenfour';
import Screenthree from '../screens/Screenthree'
const BottomTabNavigator = createBottomTabNavigator({
  One: ScreenOne,
  Four: ScreenFour,
  Three: Screenthree,
  Two: ScreenTwo
  
}, {
  initialRouteName: "One",
  tabBarOptions:{
  showLabel:false
  }
}
);

export default BottomTabNavigator;