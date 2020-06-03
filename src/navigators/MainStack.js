import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Home from '../screens/Home'
import ListFindProducts from '../screens/ListFindProducts'
import { useSelector } from 'react-redux'

const MainStack = createStackNavigator();


export default () => {
    const isLogged = useSelector(state => state.isLogged);
    
    return (
    
        <MainStack.Navigator>
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
