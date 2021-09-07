import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import CardItemDetails from '../screens/CardItemDetails';

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
            component={CardItemDetails}
            options={{headerShown: true,title: 'FoodFinder',}}
            
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack/>
}