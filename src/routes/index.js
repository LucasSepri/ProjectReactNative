import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


// import DrawerRoutes from './drawer.routes';
import StackRoutes from './stack.routes';

export function Routes() {
    return (
        <NavigationContainer>
            {/* <DrawerRoutes /> */}
            <StackRoutes/>
        </NavigationContainer>

    );
}
