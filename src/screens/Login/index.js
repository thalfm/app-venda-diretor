import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';

import { TextInput,  Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import imageLogo from '../../assets/logo.png'

import { PageView, ViewLogo, CardView, Quadrado, KeyboardArea } from './StyledComponents';


export default function Login() {

    const navigation = useNavigation();

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(true);

    function onAccessoryPress() {
        console.log('awerwerw');
        setSecureTextEntry(!secureTextEntry)
    }

    function handleLogin() {
        navigation.navigate('Home');
    }

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

  