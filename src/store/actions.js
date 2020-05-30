import * as TYPES from "./types";

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

export function addProductsToList(products) {
    return {
        type: TYPES.ADD_PRODUCTS_TO_LIST,
        products: products 
    }
}

export function setModalVisible(visiblity) {
    return {
        type: TYPES.VISIBILITY_MODAL_PRODUCT,
        visibility: visiblity 
    }
}

export function setQuantityProductsInList(quantity) {
    return {
        type: TYPES.ALTER_QUANTITY_PRODUCTS,
        quantity: quantity 
    }
}