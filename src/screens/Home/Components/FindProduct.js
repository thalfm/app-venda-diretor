import React, { useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { addProductsToList as addProductsToListAction } from '../../../store/actions';
import { AlertContext } from '../../../globalState';
import api from '../../../services/api';

const Content = styled.View`
    padding: 24px;
`;

export function FindProduct() {
    const { dispatchAlert } = React.useContext(AlertContext);

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const addProductsToList = products => dispatch(addProductsToListAction(products));

    const [codigoMercadoria, setCodigoMercadoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qualquerParte, setQualquerParte] = useState(false);
    const [atacado, setAtacado] = useState(false);
    const [promocao, setPromocao] = useState(false);
    const [loading, setLoading] = useState(false);

    
    async function handlesearch() {
        setLoading(true);
        if (!codigoMercadoria && !descricao) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe o código da mercadoria ou uma descrição'
            });
            setLoading(false);
            return;
        } 

        if (descricao && descricao.length < 3) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe uma descrição com pelo menos 03 caracteres!'
            });
            setLoading(false);
            return;
        }

        const response = await api.getProducts({
            codigoMercadoria, 
            descricao,
            qualquerParte,
            atacado,
            promocao
        });

        if (response.listaMercadoria) {
            addProductsToList(response.listaMercadoria);
            navigation.navigate('ListFindProducts');
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

    useEffect(() => {
        setCodigoMercadoria(codigoMercadoria.replace(/[^0-9]/g, ""));

    }, [codigoMercadoria]);

    return (
        <ScrollView>
            <Content>
                <TextInput
                    disabled={loading || descricao.length > 1}
                    keyboardType="numeric"
                    mode='outlined'
                    label='Código da Mercadoria'
                    value={codigoMercadoria}
                    onChangeText={setCodigoMercadoria}
                />
                <TextInput
                    disabled={loading || codigoMercadoria.length > 1}
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
                         color="#40C4FF" 
                    />
                </View>
                <Button 
                    loading={loading}
                    mode="contained"
                    icon="search"
                    onPress={handlesearch}
                    >Pesquisar</Button>
            </Content>
        </ScrollView>
    );
}