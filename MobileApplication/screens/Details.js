import React, { Component } from 'react';
import { StyleSheet, View, Text, Button,TouchableOpacity,Image } from 'react-native';
import firebase, { db } from '../config/Firebase';
import { TextInput,ScrollView } from 'react-native';
import Loading from './Loading3'
export default class Details extends Component {
state = { 
      uid: firebase.auth().currentUser.uid,
      displayname:firebase.auth().currentUser.displayName,
      pancard: '',
      aadhar: '',
      phone:'',
      emailId:'',
      loading:false

    }
   
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  func = async(userId) =>{
     
    const user = {
      displayname:this.state.displayname,
      pancard: this.state.pancard,
      aadhar: this.state.aadhar,
      phone:this.state.phone,
      emailId:this.state.emailId
      }
    db.collection("users")
      .doc(userId)
       .set(user)
      
    this.props.navigation.navigate('Videoupload')
  }
  render() {
    return (
      <ScrollView style={{ flexDirection:'column'}}>
    <Loading
      loading={this.state.loading} />
      <View style={{ backgroundColor:'#f35456',elevation:50,shadowColor:'#000000',shadowOpacity:2, borderBottomLeftRadius:30,borderBottomRightRadius:30,marginTop:30,height:200}}>
       <Image  style={{height:150,width:200,marginTop:50,borderBottomLeftRadius:30,borderBottomRightRadius:30}} source={require('../images/loginpageimage.png')}></Image>
    </View>
    <View style={{backgroundColor:'#fff',marginLeft:38,height:80}}>
    
     <Text style={{ fontSize:20,color:'#505050',marginTop:5}}>Hello,</Text>
     <Text style={{fontSize:17,color:'#606060',marginTop:10}}>{this.state.displayname}</Text>
    </View>
    <ScrollView horizontal={false}  style={{ marginLeft:30,marginRight:30}}>
        <TextInput
          style={styles.inputStyle}
          placeholder="pancard"
          value={this.state.pancard}
          onChangeText={(val) => this.updateInputVal(val, 'pancard')}
        />  
        <TextInput
        
          style={styles.inputStyle}
          placeholder="Aadhar card"
          value={this.state.aadhar}
          onChangeText={(val) => this.updateInputVal(val, 'aadhar')}
        />
        <TextInput
     
       style={styles.inputStyle}
        placeholder='Phone number'
        value={this.state.phone}
        onChangeText={(val) => this.updateInputVal(val, 'phone')}
      />
        <TextInput
      
          style={styles.inputStyle}
          placeholder='email-id'
       
          value={this.state.emailId}
          onChangeText={(val) => this.updateInputVal(val, 'emailId')}
        />
        <TouchableOpacity style={styles.button} onPress={()=>this.func(this.state.uid)}>
                  <Text style={styles.buttonText}>Submit</Text>
         </TouchableOpacity>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: '100%',
  marginBottom: 15,
  paddingBottom: 15,
  alignSelf: "center",
  borderColor: "#ccc",
  borderBottomWidth: 1,
  marginLeft:30,
  marginRight:30
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
    width: 290
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
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