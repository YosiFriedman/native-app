import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'

import SingleProduct from '../screens/Products/SingleProduct';
import ProductContainer from '../screens/Products/ProductContainer';

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
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack/>
}