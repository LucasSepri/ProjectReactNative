import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Telas
import Home from '../screens/Home';
import Carrinho from '../screens/Carrinho';
import Favoritos from '../screens/Favoritos';
import Pedidos from '../screens/Pedidos';
import Pesquisa from '../screens/Pesquisa';

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
                name="Cardapio"
                component={Home}
                options={{ tabBarIcon: "restaurant" }}
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
            /* ion-ios-gear */
            />
            <Tab.Screen
                name="Favoritos"
                component={Favoritos}
                options={{ tabBarIcon: "heart" }}
            />
            <Tab.Screen
                name="Pedidos"
                component={Pedidos}
                options={{ tabBarIcon: "clipboard" }}
            />
        </Tab.Navigator>
    );
}