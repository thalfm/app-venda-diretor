import React, { useState } from 'react';
import { Toolbar, BottomNavigation } from 'react-native-material-ui';
import Constants from 'expo-constants';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { setModalVisible as setModalVisibleAction } from '../../store/actions';
import { 
    ModalProducts,
    ListProducts,
    FindProduct
}from './Components';

const PageView = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
`;

export default function Home() {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const isModalVisible =  useSelector(state => state.isModalVisible);
    const quantityItensInList =  useSelector(state => state.quantityItensInList);

    const setModalVisible = visibility => dispatch(setModalVisibleAction(visibility));
    
    const [aba, setAba] = useState('orcamento');

    function handleLogout() {
        navigation.navigate('Login');
    }

    function handleAbaItens() {
        setModalVisible(false);
        setAba('itens');
    }

    return (
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
                <ListProducts />
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
           <ModalProducts isModalVisible={isModalVisible} />
        </PageView>
    );
}