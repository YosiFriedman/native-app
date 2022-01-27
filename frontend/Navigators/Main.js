import React, {useContext} from "react";
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
import AdminNavigator from "./AdminNavigator";
import BusinessNavigator from './BusinessNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

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
  const context = useContext(AuthGlobal)
  console.log('admin',context.stateUser.user)
  return (
    <Tab.Navigator
    initialRouteName="Feed"
      activeColor="#FF6347"
      barStyle={{ backgroundColor: 'white' }}
     
      
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarLabel:false,
        tabBarColor: 'red',
        tabBarIcon: ({ color }) => (
          <Icon
            name="home"
            style={{ position: "relative" }}
            color={color}
            size={25}
          />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Cart"
      component={CartNavigator}
      options={{
        tabBarLabel:false,
        tabBarIcon: ({ color }) => (
            <View>
<Icon name="shopping-bag" color={color} size={25} style={{display:'none'}}/>
            
         <CartIcon/>
         </View>
        ),
      }}
    /> */}
    {context.stateUser.user.role === "2" ? (
      <Tab.Screen
      name="Admin"
      component={AdminNavigator}
      options={{
        
        tabBarLabel:false,
        tabBarIcon: ({ color }) => (
          <Icon name="cog" color={color} size={25} />
        ),
      }}
    />
    ): null}
      {context.stateUser.user.role === "1" ? (
      <Tab.Screen
      
      name="Admin"
      component={BusinessNavigator}
      options={{
        tabBarLabel:false,
        tabBarIcon: ({ color }) => (
          <Icon name="cog" color={color} size={30} />
        ),
      }}
    />
    ): null}
   
      <Tab.Screen
      name="User"
      component={UserNavigator}
     
      options={{
        tabBarLabel:false,
        tabBarIcon: ({ color }) => (
          <Icon name="user" color={color} size={30} />
        ),
       
      }}
    />
  </Tab.Navigator>
  );
};
export default Main;
