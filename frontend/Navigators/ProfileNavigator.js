import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import ProfileScreen from '../screens/User/ProfileScreen'

const Stack =createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="פרופיל"
            component={ProfileScreen}
            options={{headerShown: true,title: 'FoodFinder',}}
            
            />
        </Stack.Navigator>
    )
}

export default function ProfileNavigator(){
    return <MyStack/>
}