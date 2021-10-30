import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


//screens
import Checkout from "../screens/Cart/Checkout/Checkout";
import Payment from "../screens/Cart/Checkout/Payment";
import Confirm from "../screens/Cart/Checkout/Confirm";


const Tab = createMaterialTopTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator>
         {/* <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: true, title: "תשלום" }}
    
      /> */}
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: true, title: "תשלום" }}
    
      />
        {/* <Tab.Screen
        name="Confirm"
        component={Confirm}
        options={{ headerShown: true, title: "אישור" }}
      
      /> */}
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs/>;
}
