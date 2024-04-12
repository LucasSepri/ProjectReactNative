import { createStackNavigator } from "@react-navigation/stack";

import Slider from "../screens/Slider";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import TabRouter from "./tab.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown:false,        
        }}
        // initialRouteName="Home"
        >
            <Stack.Screen
                 name="Slider"
                 component={Slider}
            />

            <Stack.Screen
                 name="Login"
                 component={Login}
            />
            <Stack.Screen
                 name="Cadastro"
                 component={Cadastro}
            />
            <Stack.Screen
                 name="Home"
                 component={TabRouter}
            />
            
        </Stack.Navigator>
    );
}