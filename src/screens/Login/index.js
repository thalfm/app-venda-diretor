import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, BackHandler } from 'react-native';
import { TextInput,  Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux'
import {  
    login as loginAction
} from '../../store/actions';
import imageLogo from '../../assets/logo.png'
import { AlertContext } from '../../globalState';
import { PageView, ViewLogo, CardView, Quadrado, KeyboardArea } from './StyledComponents';
import api from '../../services/api'

export default function Login() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { dispatchAlert } = React.useContext(AlertContext);

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = () => dispatch(loginAction());

    function onAccessoryPress() {
        setSecureTextEntry(!secureTextEntry)
    }

    async function handleLogin() {
        if (!userName || !password) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe um usuário e uma senha'
            });
            return
        }

        const response = await api.efetuarLogin(userName, password);

console.log(response);

        if (response.data.data && response.data.data.sucesso === 1) {
            login();
            navigation.navigate('Home');
            return;
        }

        dispatchAlert({
            type: 'open',
            alertType: 'error',
            message: response.data.msg
        });
       
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
  

    return (
        <PageView>
            <KeyboardArea>
                <CardView cor="#FFFFFF" largura="90%" altura="230px">
                    <View style={{top: '5%'}}>
                        <TextInput
                            mode='outlined'
                            label='Usuário'
                            value={userName}
                            onChangeText={setUserName}
                        />
                    </View>
                    <View  style={{top: '5%'}} >
                        <TextInput
                            mode='outlined'
                            label='Código da Mercadoria'
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={secureTextEntry}
                            label='Senha'
                        />
                        <MaterialIcon
                            style={{
                                position: 'absolute',
                                top: 20,
                                right: 10,
                                zIndex:1000
                            }}
                            size={24}
                            name={secureTextEntry?
                                    'visibility':
                                    'visibility-off'}
                            onPress={onAccessoryPress}
                        />
                    </View>
                    <View  style={{top: '15%'}} >
                        <Button
                            onPress={handleLogin} 
                            mode="contained"
                        >ENTRAR</Button>
                    </View>
                </CardView>
                <Quadrado largura="100%" altura="100%" cor="#FFFFFF">
                    <Quadrado largura="100%" altura="100%" cor="#03a9f4">
                    
                    </Quadrado>
                    <Quadrado largura="100%" altura="270px" cor="#FFFFFF">
                        <ViewLogo>
                            <Image source={imageLogo} />
                        </ViewLogo>
                    </Quadrado>
                </Quadrado>
            </KeyboardArea>
        </PageView>
    );
}

  