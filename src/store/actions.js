import * as TYPES from "./types";


export function login() {
    return {
        type: TYPES.IS_LOGGED,
        login: true
    }
}

export function logout() {
    return {
        type: TYPES.IS_LOGGED,
        login: false
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