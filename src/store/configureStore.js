import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { loadState, saveState } from '../utils';



const persistedStore = loadState();
const store = createStore(rootReducer, persistedStore, applyMiddleware(thunk));
store.subscribe(() => {
    saveState(store.getState());
})

export default store;