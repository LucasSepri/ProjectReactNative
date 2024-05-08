import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default AuthRoutes;
