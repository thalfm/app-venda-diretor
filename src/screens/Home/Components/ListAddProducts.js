import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import {  
    delItens as delItensAcction,
    delAllItens as delAllItensAction,
    setQuantityProductsInList as setQuantityProductsInListAction
} from '../../../store/actions';
import { ListItem } from 'react-native-material-ui';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';
import { DialogContext, AlertContext } from '../../../globalState';
import api from '../../../services/api';

export function ListAddProducts() {
    const { dispatchDialog } = React.useContext(DialogContext);
    const { dispatchAlert } = React.useContext(AlertContext);

    const dispatch = useDispatch()
    const itens = useSelector(state => state.itens);

    const delItens = product => dispatch(delItensAcction(product));
    const delAllItens = () => dispatch(delAllItensAction());
    const setQuantityProductsInList = quantity => dispatch(setQuantityProductsInListAction(quantity));
    const [loading, setLoading] = useState(false);


    function handleDeleteItem(product) {
        delItens(product);
        setQuantityProductsInList(-1);
    }

    async function handleFinalizarVenda() {
        dispatchDialog({type: 'close'})
        setLoading(true);
        let usuario = await AsyncStorage.getItem('usuario');;
        usuario = JSON.parse(usuario);

        const products = itens.map((item) => {
            return  {
                tipoPrecoMercadoria: 'n', 
                valor: item.precoMinimo , 
                codigoMercadoria: item.idMercadoria, 
                quantidade: item.quantidade
            } 
        })

        const response = await api.efetuarPedido(products, usuario);

        if (response.sucesso === true) {
            dispatchAlert({
                type: 'open',
                alertType: 'success',
                message: response.msg
            });
            delAllItens();
        }else {
            dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: 'Ocorreu um erro ao realizar o pedido! Tente novamente mais tarde!'
            });
        }
        setLoading(false);
    }

    function openDialogFinalizarPedido() {
        if (!itens.length) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Para finalizar o pedido é necessário pelo menos um item!'
            });
            return;
        }
        
        dispatchDialog({
            type: 'open',
            title: 'Finalizar Pedido',
            message: 'Deseja realmente finalizar o pedido?',
            okFunc: () => { handleFinalizarVenda() }
        })
    }

    return (
      
        <View style={{flex:1}}>
            <FlatList tyle={{marginTop: 32}}
                data={itens}
                keyExtractor={ product => String(product.idMercadoria) }
                showsVerticalScrollIndicator={true}
                onEndReachedThreshold={0.20}
                renderItem={({ item: product }) => (
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: product.descricao,
                            secondaryText: `Valor: ${product.precoMinimoFormatado}` ,
                            tertiaryText: `Quantidade: ${product.quantidade || 0}`
                        }}
                        rightElement='delete-forever'
                        onRightElementPress={() => handleDeleteItem(product)}
                    />
                )}
            />
            <Button 
                loading={loading}
                color='#00C853'
                mode="contained"
                onPress={ openDialogFinalizarPedido }
            >Finalizar Pedido</Button>
        </View>
    );
}