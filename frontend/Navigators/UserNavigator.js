import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/User/SignInScreen";
import SignUpScreen from "../screens/User/SignUpScreen";
import ProfileScreen from "../screens/User/ProfileScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

<Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
