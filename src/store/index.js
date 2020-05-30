import { createStore } from 'redux'
import vendaDiretorReducer from './reducers'

const store = createStore(vendaDiretorReducer);

export default store;