import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducer/rootReducer';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for Web
import { thunk } from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['product', 'user'],
}

const store = createStore(persistReducer(persistConfig, rootReducer), composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store)

export { store, persistor }; 