import * as TYPES from "./types";


export function login(payload) {
    return {
        type: TYPES.IS_LOGGED,
        login: true,
        payload: payload
    }
}

export function logout() {
    return {
        type: TYPES.IS_LOGGEDOUT,
        login: false,
        payload: {
                    idFuncionario: '',
                    apelido: '',
                    idLoja: '',
                    loja: '',
                    idDeposito: '',
                    deposito: '',
                    miniaturaImagemPerfil: '',
                    idTerceiro: ''
                }
    }
}

export function addItens(item) {
    return {
        type: TYPES.ADD_ITENS,
        item: item
    }
}

export function delItens(item) {
    return {
        type: TYPES.DEL_ITENS,
        item: item 
    }
}

export function delAllItens(item) {
    return {
        type: TYPES.DEL_ALL_ITENS
    }
}

export function addProductsToList(products) {
    
    return {
        type: TYPES.ADD_PRODUCTS_TO_LIST,
        products: products 
    }
}


export function setQuantityProductsInList(quantity) {
    return {
        type: TYPES.ALTER_QUANTITY_PRODUCTS,
        quantity: quantity 
    }
}