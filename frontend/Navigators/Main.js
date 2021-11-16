import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import ProfileNavigator from "./ProfileNavigator";
import UserNavigator from "./UserNavigator";
import CartIcon from '../components/CartIcon';
const icon = require("../assets/icons/fastfood.png");
const Tab = createMaterialBottomTabNavigator();
const COLORS = {
  // base colors
  primary: "#FC6D3F", // orange
  secondary: "#CDCDD2",   // gray

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",

  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: '#898C95',
};


const Main = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      showLabel: false,
      activeTintColor: "blue",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon
            name="home"
            style={{ position: "relative" }}
            color={color}
            size={30}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartNavigator}
      options={{
        tabBarIcon: ({ color }) => (
            <View>
<Icon name="shopping-cart" color={color} size={30} />
            
         <CartIcon/>
         </View>
        ),
      }}
    />
    <Tab.Screen
      name="Admin"
      component={CartNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="cog" color={color} size={30} />
        ),
      }}
    />
   
      <Tab.Screen
      name="User"
      component={UserNavigator}
     
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="user" color={color} size={30} />
        ),
       
      }}
    />
  </Tab.Navigator>
  );
};
export default Main;
