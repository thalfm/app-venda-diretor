import { INITIAL_STATE } from './state';
import * as types from './types';

export default function vendaDiretorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.IS_LOGGED:
            return {...state, isLogged: action.login, usuario: {...state.usuario, ...action.payload}}

        case types.IS_LOGGEDOUT:
            return {
                    ...state, 
                    isLogged: false,
                    itens: [],
                    products: [], 
                    quantityItensInList:0,
                    usuario: action.payload
                }

        case types.ADD_ITENS:
            return {...state, itens: [...state.itens, action.item]}

        case types.DEL_ITENS:
            const newItems = state.itens.filter((item) => item.idMercadoria !== action.item.idMercadoria);
            return {...state, itens: newItems}

        case types.DEL_ALL_ITENS:
            return {...state, itens: []}

        case types.ADD_PRODUCTS_TO_LIST:
            return { ...state, products: action.products}

        case types.ALTER_QUANTITY_PRODUCTS:
            return {...state, quantityItensInList: state.quantityItensInList + action.quantity}

        case types.SUB_QUANTITY_PRODUCTS:
            return {...state, quantityItensInList: state.quantityItensInList - action.quantity}
    
        case types.ZERO_QUANTITY_PRODUCTS:
            return {...state, quantityItensInList: 0}
        
        default:
            return state
    }
}