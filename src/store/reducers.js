import { INITIAL_STATE } from './state';
import * as types from './types';

export default function vendaDiretorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.IS_LOGGED:
            return {...state, isLogged: action.login}

        case types.ADD_ITENS:
            return {...state, itens: [...state.itens, action.item]}

        case types.DEL_ITENS:
            const newItems = state.itens.filter((item) => item.id !== action.item.id);
            return {...state, itens: newItems}

        case types.DEL_ALL_ITENS:
            return {...state, itens: []}

        case types.ADD_PRODUCTS_TO_LIST:
            return { ...state, products: action.products}

        case types.ALTER_QUANTITY_PRODUCTS:
            return {...state, quantityItensInList: state.quantityItensInList + action.quantity}

        default:
            return state
    }
}