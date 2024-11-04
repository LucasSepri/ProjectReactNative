import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/COLORS';

interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.buttonTab}
                        >
                            <View style={{ alignItems: 'center', padding: 4 }}>
                                <View style={[styles.innerButton, { backgroundColor: isFocused ? COLORS.primary : "transparent" }]}>
                                    {options.tabBarIcon && options.tabBarIcon({ color: isFocused ? COLORS.white : COLORS.black, size: 34 })}
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderRadius: 99,
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 34 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.white,
        gap: 0,
        elevation: 10,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.80,
    },

    buttonTab: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    innerButton: {
        padding: 10,
        borderRadius: 99,
    },
});

export default CustomTabBar;
