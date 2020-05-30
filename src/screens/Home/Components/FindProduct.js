
import React, { useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { 
    setModalVisible as setModalVisibleAction, 
    addProductsToList as addProductsToListAction
} from '../../../store/actions';
import { AlertContext,  } from '../../../globalState';
import api from '../../../services/api';

const Content = styled.View`
    padding: 24px;
`;

export function FindProduct() {
    const { dispatchAlert } = React.useContext(AlertContext);

    const dispatch = useDispatch()

    const addProductsToList = products => dispatch(addProductsToListAction(products));
    const setModalVisible = (visibility) => dispatch(setModalVisibleAction(visibility));

    const [codigoMercadoria, setCodigoMercadoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qualquerParte, setQualquerParte] = useState(false);
    const [atacado, setAtacado] = useState(false);
    const [promocao, setPromocao] = useState(false);
    
    async function handlesearch() {

        if (!codigoMercadoria && !descricao) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe o código da mercadoria ou uma descrição'
            });
            return;
        } 

        const productsToList = await api.productsFake;
        setModalVisible(true);
        addProductsToList(productsToList);
    }

    useEffect(() => {
        setCodigoMercadoria(codigoMercadoria.replace(/[^0-9]/g, ""));
        console.log(codigoMercadoria);
    }, [codigoMercadoria]);

    return (
        <ScrollView>
            <Content>
                <TextInput
                    keyboardType="numeric"
                    mode='outlined'
                    label='Código da Mercadoria'
                    value={codigoMercadoria}
                    onChangeText={setCodigoMercadoria}
                />
                <TextInput
                    mode='outlined'
                    label='Descrição da Mercadoria'
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <View style={{paddingTop: -13}}>
                    <Checkbox.Item 
                        label="Pesquisar em qualquer parte" 
                        status={qualquerParte ? 'checked' : 'unchecked'} 
                        onPress={() => setQualquerParte(!qualquerParte)}
                    />
                </View>
                <View style={{paddingTop: -13}}>
                    <Checkbox.Item  
                        label="Mostrar Itens em Atacado" 
                        status={atacado ? 'checked' : 'unchecked'} 
                        onPress={() => setAtacado(!atacado)}    
                    />
                </View>
                <View style={{paddingTop: -13}}>
                    <Checkbox.Item 
                        label="Mostrar Itens em Promoção" 
                        status={promocao ? 'checked' : 'unchecked'} 
                        onPress={() => setPromocao(!promocao)}     
                    />                    
                </View>
                <Button 
                    mode="contained"
                    icon="search"
                    onPress={handlesearch}
                    >Pesquisar</Button>
            </Content>
        </ScrollView>
    );
}