import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cart from "../screens/Cart/Cart";

import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: true, title: "FoodFinder" }}
      /> */}
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{ headerShown: true, title: "תשלום" }}
      />
    </Stack.Navigator>
  );
}

export default function CartNavigator() {
  return <MyStack />;
}
