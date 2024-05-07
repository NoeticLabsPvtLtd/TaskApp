import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Use AsyncStorage for React Native
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false, // Ignore non-serializable values (like functions)
        }),
});

// Create a persistor object to persist the store's state
export const persistor = persistStore(store);



export default store; 