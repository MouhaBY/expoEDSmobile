import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import store from '../Redux/configureStore';
import {SUBMIT} from '../Redux/Reducers/configurationReducer';
import {LOGIN, LOGOUT} from '../Redux/Reducers/authenticationReducer';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            serverAddress:'',
            isFormValid:false,
            isConfigurating:false,
            connectMessage:''
        }
    }

    componentDidMount(){
        const state = store.getState();
        const serverAddress = state.configReducer.serverAddress;
        this.setState({serverAddress});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.username !== prevState.username || this.state.password !== prevState.password) {
            this.setState({connectMessage:''});
            this.validateForm();
        }
    }

    validateForm = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    login = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            let user_found = {fullName:"Mohammed BEN YAHIA", username:"123", password:"123", profile:"Livreur", StoreName:"Ag Sousse Sud"};
            if (this.state.username === user_found.username){
                if (this.state.password === user_found.password) {
                    const action = { type: LOGIN, value: user_found };
                    this.props.dispatch(action);
                }
                else{
                    this.setState({connectMessage:'Mot de passe erroné'});
                    const action = { type: LOGOUT, value: {} };
                    this.props.dispatch(action);
                }
            }
            else{
                this.setState({connectMessage:'Utilisateur introuvable'});
                const action = { type: LOGOUT, value: {} };
                this.props.dispatch(action);
            }    
        }
    }

    submitConfiguration = () => {
        const action = { type: SUBMIT, value: this.state.serverAddress };
        this.props.dispatch(action);
        this.setState({isConfigurating:false});
    }

    handleUsernameUpdate = username => { this.setState({username}) }
    handlePasswordUpdate = password => { this.setState({password}) }
    handleServerAddressUpdate = serverAddress => { this.setState({serverAddress}) }
    
    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.background_container}>
                    <Text>Scantech easyDelivery© 2021</Text>
                </View>
                <View style={styles.configuration_container}>
                    <TouchableOpacity onPress={() => this.setState({ isConfigurating: !this.state.isConfigurating })}>
                        <Image source={require('../Images/gear.png')} style={styles.gear}/>
                    </TouchableOpacity>
                    {this.state.isConfigurating &&
                    <TextInput 
                    value={this.state.serverAddress} 
                    onChangeText={this.handleServerAddressUpdate}
                    placeholder="Adresse serveur" 
                    style={styles.config_input}/>}
                    {this.state.isConfigurating &&
                    <Button title='Submit' onPress={()=>{this.submitConfiguration()}}/>}
                </View>
                <View style={styles.logo_title}>
                    <Image source={require('../Images/delivery.png')} style={styles.logo}/>
                    <Text style={styles.mainTitle}>EDS Mobile</Text>
                </View>
                <View style={styles.form_container}>
                    <Text style={styles.inputTitle}>Nom d'utilisateur</Text>
                    <TextInput 
                    value={this.state.username}
                    onChangeText={this.handleUsernameUpdate}
                    placeholder="Username"
                    autoFocus={true}
                    ref={(input) => { this.firstTextInput = input }}
                    onSubmitEditing={() => { this.secondTextInput.focus() }}
                    style={styles.input_container}/>
                    <Text style={styles.inputTitle}>Mot de passe</Text>
                    <TextInput
                    value={this.state.password}
                    onChangeText={this.handlePasswordUpdate}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    ref={(input) => { this.secondTextInput = input }}
                    onSubmitEditing={() => { this.login }}
                    style={styles.input_container}/>
                    <Text style={styles.errorMessages}>{this.state.connectMessage}</Text>
                    <View style={styles.button_container}>
                        <TouchableOpacity
                        style={[styles.button, {backgroundColor: !this.state.isFormValid ? '#bdbdbd': '#333333'}]}
                        disabled= {!this.state.isFormValid}
                        onPress={this.login}>
                            <Text style={{color:'white',}}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FDB515'
    },
    background_container:{
        backgroundColor:'#eeeeee', 
        position:'absolute', 
        height:"30%", 
        width:"100%", 
        bottom:0,
        justifyContent:'flex-end',
        padding:10,
    },
    configuration_container:{
        padding:10,
        flexDirection:'row',
        position:'absolute',
        alignItems:'center',
        top:0,
        left:0
    },
    gear:{
        width: 40,
        height: 40,
        resizeMode: 'stretch',
    },
    logo_title:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        top:70,
    },
    logo:{
        width: 150,
        height: 150,
        resizeMode: 'stretch',
    },
    mainTitle:{
        fontWeight: "bold",
        //fontStyle: 'italic',
        fontSize: 38,
    },
    form_container:{
        backgroundColor:'white',
        borderRadius:20,
        width:"85%",
        height:300,
        padding:20,
        justifyContent:'center',
        marginTop:"35%",
    },
    inputTitle:{
        fontWeight:'bold',
        marginBottom:5
    },
    input_container:{
        height:45,
        borderColor:'lightgrey',
        borderWidth:1,
        borderRadius:5,
        marginBottom:10,
        padding:5,
    },
    config_input:{
        borderColor:'lightgrey',
        backgroundColor:'white',
        height:40,
        borderWidth:1,
        padding:5,
        marginLeft:15,
        width:"50%"
    },
    errorMessages:{
        marginBottom:10,
        color:'#E86054'
    },
    button_container:{
        alignItems:'center', 
        justifyContent:'center', 
        flex:1
    },
    button:{
        height:50,
        borderRadius: 20,
        width:"60%",
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => {
    return{
        authenticated: state.authReducer.authenticated,
        serverAddress: state.configReducer.serverAddress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
