import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Toolbar, BottomNavigation } from 'react-native-material-ui';
import Constants from 'expo-constants';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { logout as logoutAction } from '../../store/actions';
import api from '../../services/api';
import { AlertContext } from '../../globalState';
import { 
    ListAddProducts,
    FindProduct
}from './Components';

const PageView = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
`;

export default function Home() {
    const { dispatchAlert } = React.useContext(AlertContext);
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const logout = () => dispatch(logoutAction());

   const quantityItensInList =  useSelector(state => state.quantityItensInList);

    const [aba, setAba] = useState('orcamento');

    async function handleLogout() {
        const response = await api.efetuarLogout();
        if (response.sucesso !== 1) {
            dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: 'Ocorreu um erro ao fazer o logout! Tente novamente mais tarde.'
            });
            return;
        }

        logout();
        navigation.navigate('Login');
    }

    function handleAbaItens() {
        setAba('itens');
    }

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
            
                <Toolbar
                    centerElement="Venda Diretor"
                    rightElement={{
                        menu: {
                            icon: "more-vert",
                            labels: ["sair"]
                        }
                    }}
                    onRightElementPress={ handleLogout }
                />
                { aba === 'orcamento' &&
                    <FindProduct />
                }
                { aba === 'itens' &&
                    <ListAddProducts />
                }
                <BottomNavigation active={aba} hidden={false} >
                    <BottomNavigation.Action
                        key="orcamento"
                        icon="shopping-cart"
                        label="Orçamento"
                        onPress={() => setAba('orcamento')}
                    />
                    <BottomNavigation.Action
                        key="itens"
                        icon="shopping-basket"
                        label={`Itens (${quantityItensInList})`}
                        onPress={handleAbaItens}
                    />
                </BottomNavigation>
            
            </PageView>
        </>
    );
}