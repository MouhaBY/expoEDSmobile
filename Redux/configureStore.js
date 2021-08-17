import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './Reducers/authenticationReducer'
import configReducer from './Reducers/configurationReducer'

const rootPersistConfig = {
    key:'root',
    storage: AsyncStorage
}

const store = createStore(persistCombineReducers(rootPersistConfig, {authReducer, configReducer}));

export default store;
