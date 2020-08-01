import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView, Alert,Image,TouchableOpacity} from 'react-native';
import firebase from '../config/Firebase';
import {TextInput} from 'react-native-paper'
import Loading from './Loading2';
export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      loading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        loading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Details')
      })
      .catch(error =>{alert(error),this.setState({loading:false})})      
    }
  }

  render() {
    
    return (
      <ScrollView style={{ flexDirection:'column'}}>
    <Loading
      loading={this.state.loading} />
    <View style={{ backgroundColor:'#f35456',elevation:50,shadowColor:'#000000',shadowOpacity:2, borderBottomLeftRadius:30,borderBottomRightRadius:30,marginTop:30,height:200}}>
       <Image  style={{height:150,width:200,marginTop:50,borderBottomLeftRadius:30,borderBottomRightRadius:30}} source={require('../images/loginpageimage.png')}></Image>
    </View>
    <View style={{backgroundColor:'#fff',marginLeft:38,height:50}}>
      
     <Text style={{ fontSize:20,color:'#505050',marginTop:2}}>Hello,</Text>
     <Text style={{fontSize:17,color:'#606060',marginTop:1}}>create an account</Text>
    </View>
    <View style={{height:400}}>  
    <TextInput
       mode ='outlined'
       style={styles.inputStyle}
        label='Enter Displayname'
        underlineColor='transparent'
        value={this.state.displayName}
        onChangeText={(val) => this.updateInputVal(val, 'displayName')}
      />
       <TextInput
       mode ='outlined'
       style={styles.inputStyle}
        label='Enter Email'
        underlineColor='transparent'
        value={this.state.email}
        onChangeText={(val) => this.updateInputVal(val, 'email')}
      />
        <TextInput
          mode ='outlined'
          style={styles.inputStyle}
           label='Enter Password'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <TouchableOpacity style={styles.button} onPress={()=>this.registerUser()}>
                  <Text style={styles.buttonText}>Signup</Text>
         </TouchableOpacity>

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>   
   
  </View>
    
  </ScrollView>
  
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundImage:require('../images/backgroung.jpg')
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  inputStyle: {
    width: '80%',
    fontSize:15,
    marginBottom: 2,
    marginTop:5,
    paddingBottom: 0,
    alignSelf: 'center',
    borderColor: "#ccc",
    borderBottomWidth: 1
    
  },
  inputStyle1: {
    width: '80%',
    fontSize:15,
    marginBottom: 5,
    marginTop:5,
    paddingBottom: 0,
    alignSelf: 'center',
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginLeft:38
  },
  button: {
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#66B2FF',
    borderColor: '#66B2FF',
    borderWidth: 3,
    borderRadius: 10,
    width: 290,
    marginLeft:38
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  loginText: {
    color: '#3740FE',
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});