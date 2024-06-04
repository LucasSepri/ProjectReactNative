import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Telas
import Home from '../screens/Home';
import Pesquisa from '../screens/Pesquisa'
import Pedidos from '../screens/Pedidos';
import Carrinho from '../screens/Carrinho';
import Favoritos from '../screens/Favoritos';

//Componente para Customizar a Barra de Navegação
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarIcon: "home" }}
            />
            <Tab.Screen
                name="Carrinho"
                component={Carrinho}
                options={{ tabBarIcon: "cart" }}
            />
            <Tab.Screen
                name="Pesquisa"
                component={Pesquisa}
                options={{ tabBarIcon: "search" }}
            />
            <Tab.Screen
                name="Favoritos"
                component={Favoritos}
                options={{ tabBarIcon: "heart" }}
            />
            <Tab.Screen
                name='Pedidos'
                component={Pedidos}
                options={{ tabBarIcon: 'list' }}
            />

        </Tab.Navigator>
    );
}