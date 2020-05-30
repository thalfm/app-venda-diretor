import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, TextInput, Button, Card, Title, Paragraph} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import {  
    addItens as addItensAction,
    setModalVisible as setModalVisibleAction,
    setQuantityProductsInList as setQuantityProductsInListAction
} from '../../../store/actions';
import imageProduct from '../../../assets/cimento.jpeg';
import { AlertContext } from '../../../globalState';

export function ModalProducts() {
    const { dispatchAlert } = React.useContext(AlertContext);

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const isModalVisible =  useSelector(state => state.isModalVisible);
    const itens = useSelector(state => state.itens);

    const addItens = product => dispatch(addItensAction(product));
    const setModalVisible = visibility => dispatch(setModalVisibleAction(visibility));
    const setQuantityProductsInList = quantity => dispatch(setQuantityProductsInListAction(quantity));
    
    const [quantidade, setQuantidade] = useState({});

    async function handleAddIten(product) {

        if (!product.quantidade) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Informe uma quantidade maior que zero'
            });
            return;
        }

        const existItem = await itens.filter((item) => item.id === product.id);

        if (existItem.length) {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: 'Item já foi adicionado'
            });
            return;
        }

        addItens(product);
       
        dispatchAlert({
            type: 'open',
            alertType: 'success',
            message: 'Item adicionado'
        });
        
        setQuantityProductsInList(1);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function handleQuantity(product, quantity) {
        let qtd = quantity;
        if (!product.isOperaDecimal) {
            qtd = quantity.replace(/[^0-9]/g, "")
        }

        product.quantidade = qtd;

        setQuantidade({ [product.id] : qtd })
    }

    useEffect(() => {
        setQuantidade(quantidade);
        console.log(quantidade)
    }, [quantidade]);

    return (
        <Modal
            onDismiss={closeModal}
            visible={isModalVisible} 
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.container}>
                <Title style={styles.tilte}>Adicione itens a sua lista</Title>
                <FlatList style={{}}
                    data={products}
                    keyExtractor={ product => String(product.id) }
                    showsVerticalScrollIndicator={true}
                    onEndReachedThreshold={0.20}
                    style={styles.contentList}
                    renderItem={({ item: product }) => (
                    <Card 
                        elevation={5}
                        style={styles.card}
                    >
                        <Card.Cover 
                        style={styles.cardCover} source={imageProduct} 
                        />
                        <Card.Content>
                            <Title>{product.descricao}</Title>
                            <Paragraph>
                                Valor: {Intl
                                        .NumberFormat('pt-Br', {style: 'currency', currency: 'BRL'})
                                        .format(product.valor)}
                            </Paragraph>
                            <TextInput
                                style={styles.textInput}
                                keyboardType="numeric"
                                mode='outlined'
                                label='Quantidade'
                                value={quantidade[product.id] || '1'}
                                onChangeText={qtd => handleQuantity(product, qtd)}
                            />
                            <Button 
                                mode="contained"
                                icon="add"
                                onPress={() => handleAddIten(product)}
                            >Adicionar</Button>
                        </Card.Content>
                    </Card>
                    )}
                />
            </View>
            <Button 
                color='#e51c23'
                mode="contained"
                icon="arrow-back"
                onPress={ closeModal }
            >Voltar para Pesquisa</Button>
        </Modal>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor:'white', 
        borderRadius:4, 
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    tilte: {
        padding: 10
    },
    contentList: {
        marginTop: 32
    },
    card: {
        marginBottom:8, 
        borderStyle: 'solid', 
        borderTopWidth:1, 
        borderLeftWidth:1,
        borderRightWidth:1, 
        borderColor: '#D8D8D8'
    },
    cardCover: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        justifyContent: "center",
        alignSelf: "center"
    },
    textInput: {
        marginBottom:3
    }
  });