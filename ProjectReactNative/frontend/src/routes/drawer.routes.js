import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator screenOptions={{title: ''}}>
            <Drawer.Screen
                 name="menu"
                 component={TabRoutes}
                 options={
                    {drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />),
                        drawerLabel: 'Inicio'
                    }
                 }
            />
            <Drawer.Screen
                 name="Login"
                 component={StackRoutes}
                 options={
                    {drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />),
                        drawerLabel: 'Login'
                    }
                 }
            />
        </Drawer.Navigator>
    );
}