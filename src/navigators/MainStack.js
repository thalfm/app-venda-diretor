import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../screens/Preload'
import Login from '../screens/Login'
import Home from '../screens/Home'
import ListFindProducts from '../screens/ListFindProducts'
import { useSelector } from 'react-redux'

const MainStack = createStackNavigator();


export default () => {
    const isLogged = useSelector(state => state.isLogged);
    
    return (
    
        <MainStack.Navigator initialRouteName="Preload">
             
           <MainStack.Screen name="Preload" component={ Preload } options={{
                headerShown:false,
            }}/>
    
            { !isLogged && 
                <MainStack.Screen name="Login" component={ Login } options={{
                    headerShown:false
                }}/>
            }
           
           <MainStack.Screen name="Home" component={ Home } options={{
                headerShown:false,
            }}/>
    
    
            <MainStack.Screen name="ListFindProducts" component={ ListFindProducts } options={{
                headerShown:false,
            }}/>
           
        </MainStack.Navigator>
    )
};
