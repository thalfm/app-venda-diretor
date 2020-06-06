import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput,  Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux'
import { login as loginAction } from '../../store/actions';
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
    const [loading, setLoading] = useState(false);

    const login = (payload) => dispatch(loginAction(payload));

    function onAccessoryPress() {
        setSecureTextEntry(!secureTextEntry)
    }

    async function handleLogin() {
        setLoading(true);
        if (!userName || !password) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe um usuário e uma senha'
            });
            setLoading(false);
            return
        }

        const response = await api.efetuarLogin(userName, password);

        if (response.sucesso === 1) {
            login(response.data);
            const json = JSON.stringify(response.data)
            await AsyncStorage.setItem('usuario', json);
        
            setLoading(false);
            return;
        }

        dispatchAlert({
            type: 'open',
            alertType: 'error',
            message: response.msg
        });
       setLoading(false);
    }

    return (
        <PageView>
            <KeyboardArea>
                <CardView cor="#FFFFFF" largura="90%" altura="230px">
                    <View style={{top: '5%'}}>
                        <TextInput
                            disabled={loading}
                            mode='outlined'
                            label='Usuário'
                            value={userName}
                            onChangeText={setUserName}
                        />
                    </View>
                    <View  style={{top: '5%'}} >
                        <TextInput
                            disabled={loading}
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
                            loading={loading}
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

  