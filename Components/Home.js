import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {LOGOUT} from '../Redux/Reducers/authenticationReducer'


class Home extends React.Component{
    constructor(props){
        super(props)
    }

    logout(){
        const action = { type: LOGOUT, value: {} };
        this.props.dispatch(action);
    }

    accessMenu(key){
        this.props.navigation.navigate(key);
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles.userBar}>
                    <View style={styles.userData}>
                        <Text style={styles.text_container}>{ "Contact : "+ this.props.userData.FullName }</Text>
                        <Text style={styles.text_container}>{ "Nom d'utilisateur : "+ this.props.userData.Username }</Text>
                        <Text style={styles.text_container}>{ "Profil : "+ this.props.userData.Roles }</Text>
                        <Text style={styles.text_container}>{ "Agence : "+ this.props.userData.StoreName }</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton_container} onPress={()=> this.logout()}>
                        <Image source={require('../Images/remove.png')} style={styles.logoutButton}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.background_container}>
                    <Text>Scantech easyDelivery© 2021</Text>
                </View>
                <View style={styles.allButtons}>
                    <View style={styles.rowButton}>
                        <TouchableOpacity 
                        style={ styles.squareButtonContainer }
                        onPress={() => {this.accessMenu("Home")}}>
                            <Image source={require('../Images/approved.png')} style={styles.image}/>
                            <Text style={styles.textButtonContainer}>Collecte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.squareButtonContainer}
                        onPress={() => {this.accessMenu("Home")}}>
                            <Image source={require('../Images/out-box.png')} style={styles.image}/>
                            <Text style={styles.textButtonContainer}>Déstockage</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowButton}>
                            <TouchableOpacity 
                            style={styles.squareButtonContainer}
                            onPress={() => {this.accessMenu("Home")}}>
                                <Image source={require('../Images/open-box.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Stockage</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.squareButtonContainer}
                            onPress={() => {this.accessMenu("Home")}}>
                                <Image source={require('../Images/drop-shipping.png')} style={styles.image}/>
                                <Text style={styles.textButtonContainer}>Livraison</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.rowButton}>
                        <TouchableOpacity 
                        style={styles.squareButtonContainer}
                        onPress={() => {this.accessMenu("Home")}}>
                            <Image source={require('../Images/search.png')} style={styles.image}/>
                            <Text style={styles.textButtonContainer}>Contrôle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.squareButtonContainer}
                        onPress={() => { this.accessMenu("Home") }}>
                            <Image source={require('../Images/stock.png')} style={styles.image}/>
                            <Text style={styles.textButtonContainer}>Stock</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1, 
    },
    background_container:{
        backgroundColor:'white', 
        position:'absolute', 
        height:"75%", 
        width:"90%",
        margin:"5%",
        borderRadius:20,
        bottom:0,
        justifyContent:'flex-end',
        padding:15,
    },
    userData:{
        flex:1,
        padding:7
    },
    userBar:{
        backgroundColor:'#333333',
        padding:5,
        height:120,
        borderRadius:20,
        margin:3,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    text_container:{
        color:'white',
        fontSize:14,
        justifyContent:'center',
    },
    logoutButton_container:{
        alignItems:'flex-end', 
        margin:15
    },
    logoutButton:{
        resizeMode: 'stretch', 
        height: 45, 
        width: 45
    },
    allButtons:{
        flex:1, 
        justifyContent:'center', 
        marginBottom:"15%"
    },
    rowButton:{
        flexDirection:'row', 
        justifyContent:'center', 
        margin:5
    },
    squareButtonContainer:{
        justifyContent:'center',
        alignItems:'center',
        margin:7,
        height: 120,
        width: 150,
        borderRadius: 5,
        backgroundColor:'#FDB515',
    },
    textButtonContainer:{
        textAlign: 'center',
        color:'black', 
        fontSize: 16,
    },
    image:{
        resizeMode: 'stretch',
        height: 50,
        width: 50,
        margin:5,
    },
})

const mapStateToProps = (state) => {
    return{
        authenticated: state.authReducer.authenticated,
        userData: state.authReducer.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
