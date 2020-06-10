import { CommonActions, useNavigation} from '@react-navigation/native'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import api from '../../services/api'
import { login as loginAction } from '../../store/actions';

export default function Preload() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const login = (payload) => dispatch(loginAction(payload));

    async function checkLogin() {
        const response = await api.checkLogin();

        if (response.sucesso === 1) {
            login(response.data);
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