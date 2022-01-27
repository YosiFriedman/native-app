import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'

import SingleProduct from '../screens/Products/SingleProduct';
import ProductContainer from '../screens/Products/ProductContainer';
import CheckoutNavigator from "./CheckoutNavigator";
import Payment from "../screens/Cart/Checkout/Payment";
const Stack =createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: true,title: 'FoodFinder',}}
            
            />
              <Stack.Screen
            name="Product Detail"
            component={SingleProduct}
            options={{headerShown: true,title: 'FoodFinder',}}
            
            />
              <Stack.Screen
              name="Checkout"
              component={Payment}
              options={{ headerShown: true, title: "Checkout" }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack/>
}