
// store.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers'; // Import your root reducer
import {thunk} from "redux-thunk";

// Redux Persist configuration
const persistConfig = {
    key: 'walletStore',
    storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Create the Redux store
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
