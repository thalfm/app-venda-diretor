import React, { useState, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { BottomNavigation, Appbar, Menu, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { logout as logoutAction } from '../../store/actions';
import api from '../../services/api';
import { AlertContext, SpinnerContext } from '../../globalState';
import { ListAddProducts, FindProduct }from './Components';

const PageView = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
`;

export default function Home() {
    const { dispatchAlert } = React.useContext(AlertContext);
    const { dispatchSpinner } = React.useContext(SpinnerContext);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const logout = () => dispatch(logoutAction());

    const [stateAba, setStateAba] = useState({
        index: 0,
        routes: [
          { key: 'orcamento', title: 'Orçamento', icon: 'shopping-cart' },
          { key: 'itens', title: `Itens(0)`, icon: 'shopping-basket' },
        ],
      });
    const [isMenuVisible, setMenuVisible] = useState(false); 

    const quantityItensInList =  useSelector(state => state.quantityItensInList);
    const usuario =  useSelector(state => state.usuario);
    const isLogged = useSelector(state => state.isLogged);

    async function handleLogout() {
        setMenuVisible(false);
        dispatchSpinner({type: 'open'});

        const response = await api.efetuarLogout();

        if (response.sucesso !== 1) {
            dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: 'Ocorreu um erro ao fazer o logout! Tente novamente mais tarde.'
            });
            dispatchSpinner({type: 'close'});
            return;
        }
        await AsyncStorage.removeItem('usuario');
        logout();
        dispatchSpinner({type: 'close'});
        navigation.navigate('Login');
    }

    const _handleIndexChange = index => setStateAba({...stateAba, index:index});

    const _renderScene = BottomNavigation.SceneMap({
        orcamento: () => <FindProduct />,
        itens: () => <ListAddProducts />,
    });

    useEffect(() => {
        stateAba.routes[1].title = `Itens(${quantityItensInList})`;
    }, [quantityItensInList]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return (
        <>
            <PageView style={{
                paddingTop: Constants.statusBarHeight
            }}>
                <Appbar.Header>
                    {isLogged && usuario.miniaturaImagemPerfil &&
                        <Avatar.Image  style={styles.avatar} size={50} source={{uri: 'data:image/png;base64,' + usuario.miniaturaImagemPerfil}} />
                    }
                    {isLogged && !usuario.miniaturaImagemPerfil &&
                        <Avatar.Icon style={styles.avatar} size={50} icon="person-outline" />
                    }
                    <Appbar.Content title="Venda Diretor" subtitle={`Olá, ${usuario.apelido}`} />
                    <Menu
                        visible={isMenuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <Appbar.Action
                                icon='more-horiz'
                                style={{
                                    backgroundColor: "#FFFFFF"
                                }} 
                                onPress={() => setMenuVisible(true)} />
                        }
                    >
                        <Menu.Item 
                            icon='power-settings-new'
                            onPress={handleLogout} 
                            title="Sair" 
                        />
                    </Menu>
                </Appbar.Header>

                 <BottomNavigation
                    navigationState={stateAba}
                    onIndexChange={_handleIndexChange}
                    renderScene={_renderScene}
                />
            </PageView>
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        borderColor:"#FFF",
        borderWidth: 1,
        marginBottom: 15,
        marginLeft: 15
    }
});