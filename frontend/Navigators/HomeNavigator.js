import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import {Image} from 'react-native'
import SingleProduct from '../screens/Products/SingleProduct';
import ProductContainer from '../screens/Products/ProductContainer';
import CheckoutNavigator from "./CheckoutNavigator";
import Payment from "../screens/Cart/Checkout/Payment";
const Stack =createStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 65, height: 65,marginBottom:10 }}
      source={require('../assets/logo.png')}
    />
  );
}
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
            
            />
              <Stack.Screen
            name="Product Detail"
            component={SingleProduct}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
            
            />
              <Stack.Screen
              name="Checkout"
              component={Payment}
              options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack/>
}