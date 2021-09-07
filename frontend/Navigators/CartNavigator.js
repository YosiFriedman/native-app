import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ExploreScreen from '../screens/ExploreScreen'

const Stack =createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="עגלת קניות"
            component={ExploreScreen}
            options={{headerShown: true,title: 'FoodFinder',}}
            
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator(){
    return <MyStack/>
}