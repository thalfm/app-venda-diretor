import React, { useState, useEffect } from 'react';
import { BackHandler, AsyncStorage, ActivityIndicator, Modal } from 'react-native';
import { Toolbar, BottomNavigation } from 'react-native-material-ui';
import Constants from 'expo-constants';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { logout as logoutAction } from '../../store/actions';
import api from '../../services/api';
import { AlertContext } from '../../globalState';
import { ListAddProducts, FindProduct }from './Components';

const PageView = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
`;

const Box = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export default function Home() {
    const { dispatchAlert } = React.useContext(AlertContext);
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const logout = () => dispatch(logoutAction());

   const quantityItensInList =  useSelector(state => state.quantityItensInList);

    const [aba, setAba] = useState('orcamento');
    const [loadingLogout, setLoadingLogout] = useState(false);

    async function handleLogout() {
        setLoadingLogout(true);
        const response = await api.efetuarLogout();

        if (response.sucesso !== 1) {
            dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: 'Ocorreu um erro ao fazer o logout! Tente novamente mais tarde.'
            });
            setLoadingLogout(false);
            return;
        }
        await AsyncStorage.removeItem('usuario');
        logout();
        setLoadingLogout(false);
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

                <Modal
                    transparent={true}
                    animationType= "fade"
                    visible={loadingLogout}
                >
                    <Box>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </Box>
                </Modal>

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