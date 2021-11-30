import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


//screens
import Categories from '../screens/Admin/Categories' 
import Products from '../screens/Admin/Products' 
import Orders from '../screens/Admin/Order' 
import ProductForm from '../screens/Admin/ProductForm' 


const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Stack.Navigator>
         <Stack.Screen
        name="AdminProducts"
        component={Products}
        options={{ headerShown: true, title: "תשלום" }}
    
      />
      <Stack.Screen
        name="AdminCategories"
        component={Categories}
        options={{ headerShown: true, title: "תשלום" }}
    
      />
        <Stack.Screen
        name="AdminOrders"
        component={Orders}
        options={{ headerShown: true, title: "אישור" }}
      
      />
        <Stack.Screen
        name="AdminProductFrorm"
        component={ProductForm}
        options={{ headerShown: true, title: "אישור" }}
      
      />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyTabs/>;
}
