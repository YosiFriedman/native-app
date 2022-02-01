import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


//screens
import BusinessOrders from '../screens/Business/BusinessOrders' 
import BusinessProducts from '../screens/Business/BusinessProducts' 



const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Stack.Navigator>
       
      <Stack.Screen
        name="BusinessProducts"
        component={BusinessProducts}
        options={{ headerShown: true, title: "דף ניהול" }}
      />
        <Stack.Screen
        name="BusinessOrders"
        component={BusinessOrders}
        options={{ headerShown: true, title: "הזמנות שבוצעו" }}
    
      />
    </Stack.Navigator>
    
  );
}

export default function AdminNavigator() {
  return <MyTabs/>;
}
