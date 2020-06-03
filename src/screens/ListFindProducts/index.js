import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { TextInput, Button, Card, Title, Paragraph} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import {  
    addItens as addItensAction,
    setQuantityProductsInList as setQuantityProductsInListAction
} from '../../store/actions';
import imageProduct from '../../assets//cimento.jpeg';

export default function ListFindProducts() {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const products = useSelector(state => state.products)
    const itens = useSelector(state => state.itens);

    const addItens = product => dispatch(addItensAction(product));
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
    }, [quantidade]);

    return (
        <View
            style={styles.contentContainer}
        >
            <Toolbar
                centerElement="Adicione itens a sua lista"
            />
            <View style={styles.container}>
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
                                Valor: {product.valor}
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
                <Button 
                    color='#e51c23'
                    mode="contained"
                    icon="arrow-back"
                    onPress={ () => navigation.navigate('Home') }
                >Voltar para Pesquisa</Button>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:'white',
        paddingBottom: 60
    },
    container: {
        paddingTop: 3,
        paddingBottom: 40,
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