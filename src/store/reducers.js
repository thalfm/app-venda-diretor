import { INITIAL_STATE } from './state';
import * as TYPES from './types';

export default function vendaDiretorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.ADD_ITENS:
            return {...state, itens: [...state.itens, action.item]}

        case TYPES.DEL_ITENS:
            const newItems = state.itens.filter((item) => item.id !== action.item.id);
            return {...state, itens: newItems}

        case TYPES.ADD_PRODUCTS_TO_LIST:
            return { ...state, products: action.products}

        case TYPES.VISIBILITY_MODAL_PRODUCT:
            return {...state, isModalVisible: action.visibility}

        case TYPES.ALTER_QUANTITY_PRODUCTS:
            return {...state, quantityItensInList: state.quantityItensInList + action.quantity}

        default:
            return state
    }
}