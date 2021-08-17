import 'react-native-gesture-handler';
import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

import Store from './Redux/configureStore';
import AppNavigation from './Navigation/Navigation'


export default class App extends React.Component {
  render(){
    let persistor = persistStore(Store)
    return(
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <AppNavigation/>
      </PersistGate>
    </Provider>
    )  
  };
}
