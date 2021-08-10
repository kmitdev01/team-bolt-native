import * as React from 'react';
import { View, Text } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login/login';
import Welcome from '../Screens/Dashboard/Welcome';
import comparison from '../Screens/Dashboard/comparison';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName="welcome"
                screenOptions={{ headerShown: false }}
            >
                {/* <Stack.Screen name="Login" component={Login} /> */}
                <Stack.Screen name={"welcome"} component={Welcome} />
                <Stack.Screen name="comparison" component={comparison} />
            </Stack.Navigator>
        </NavigationContainer>




    )
}
export default MainNavigator