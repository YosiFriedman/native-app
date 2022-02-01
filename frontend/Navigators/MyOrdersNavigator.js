import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import MyOrders from "../screens/User/MyOrders";

const Stack =createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{ headerShown: false }}
      />
        </Stack.Navigator>
    )
}

export default function MyOrdersNavigator(){
    return <MyStack/>
}