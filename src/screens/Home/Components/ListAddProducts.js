import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import {  
    delItens as delItensAcction,
    delAllItens as delAllItensAction,
    subQuantityProductsInList as subQuantityProductsInListAction,
    zeroQuantityProductsInList as zeroQuantityProductsInListAction
} from '../../../store/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Title, Paragraph, Divider, IconButton, Subheading } from 'react-native-paper';
import { DialogContext, AlertContext } from '../../../globalState';
import api from '../../../services/api';

export function ListAddProducts() {
    const { dispatchDialog } = React.useContext(DialogContext);
    const { dispatchAlert } = React.useContext(AlertContext);

    const dispatch = useDispatch()
    const itens = useSelector(state => state.itens);

    const delItens = product => dispatch(delItensAcction(product));
    const delAllItens = () => dispatch(delAllItensAction());
    const subQuantityProductsInList = quantity => dispatch(subQuantityProductsInListAction(quantity));
    const zeroQuantityProductsInList = () => dispatch(zeroQuantityProductsInListAction());

    const [loading, setLoading] = useState(false);


    function handleDeleteItem(product) {
        delItens(product);
        subQuantityProductsInList(1);
        dispatchDialog({type: 'close'})
        dispatchAlert({
            type: 'open',
            alertType: 'success',
            message: 'Item removido com sucesso!'
        });
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
            zeroQuantityProductsInList();
        }else {
            dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: response.msg ? response.msg : 'Ocorreu um erro ao realizar o pedido! Tente novamente mais tarde!'
            });
        }
        setLoading(false);
    }

    function openDialogDelItem(product) {
        dispatchDialog({
            type: 'open',
            title: 'Exclusão de item da lista',
            message: `Deseja realmente remover o item: ${product.descricao}?`,
            okFunc: () => { handleDeleteItem(product) }
        })
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
        <View style={styles.contentContainer}>
            <FlatList style={styles.list}
                data={itens}
                keyExtractor={ product => String(product.idMercadoria) }
                showsVerticalScrollIndicator={true}
                onEndReachedThreshold={0.20}
                renderItem={({ item: product }) => (
                    <>
                        <View style={styles.listItem}>
                            <View style={styles.lisItemDescption}>
                                <Title>{product.idMercadoria} - {product.descricao}</Title>
                                <Paragraph>Valor: {product.precoMinimoFormatado}</Paragraph>
                                <Subheading>Quantidade: {product.quantidade}</Subheading>
                            </View>
                            <View style={styles.listItemActions}>
                                <IconButton
                                    icon="delete-forever"
                                    color="#e51c23"
                                    size={25}
                                    onPress={() => openDialogDelItem(product)}
                                />
                            </View>
                        </View>
                        <Divider />
                    </>
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

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    list: {
        marginTop: 32
    },
    listItem: {
        padding: 10,
        flex: 1,
        flexDirection: "row"
    },
    lisItemDescption: {
        width: '85%'
    },
    listItemActions: {
        flexDirection: "row"
    }
});