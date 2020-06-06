import { CommonActions, useNavigation} from '@react-navigation/native'
import { useEffect } from 'react';
import api from '../../services/api'

export default function Preload() {
    const navigation = useNavigation();

    async function checkLogin() {
        const response = await api.checkLogin();

        if (response.sucesso === 1) {
            navigation.dispatch( 
                 CommonActions.reset({
                    index:0,
                    routes: [
                        {name: 'Home'}
                    ]
                })
            );
          
        } else {
            navigation.dispatch( 
                CommonActions.reset({
                   index:0,
                   routes: [
                       {name: 'Login'}
                   ]
               })
           );
        }
    }

    useEffect(() => {
        checkLogin();
      }, [])

    
    return null;
}