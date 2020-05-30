import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Home from '../screens/Home'

const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator>
        <MainStack.Screen name="Login" component={ Login } options={{
            headerShown:false
        }}/>
        <MainStack.Screen name="Home" component={ Home } options={{
            headerShown:false,
        }}/>
    </MainStack.Navigator>
);/* image 1 */
