import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import store from '../Redux/configureStore';
import Home from '../Components/Home';
import Login from '../Components/Login';


const Stack = createStackNavigator();

const AppNavigation = () => {
    const state = store.getState();
    const authenticated = state.authReducer.authenticated;

    if (authenticated){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else{
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return{
        authenticated: state.authReducer.authenticated
    }
}

export default connect(mapStateToProps)(AppNavigation)
