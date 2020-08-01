import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import firebase, { db } from '../config/Firebase';
import * as Application from 'expo-application';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class Screenone extends Component {
  
    state = { 
     androidid:'',
     verify:''
    }
    verify = () =>{
      this.setState({verify:Application.androidId});
      console.log(this.state.verify)
      console.log(this.state.androidid)
        if(this.state.verify==this.state.androidid){
            alert("success")
            this.props.navigation.navigate('Tabnavigation')
        }
        else{
            alert("fraud detected")
        }
       
      }

  render() {
    console.disableYellowBox = true;
    const userId = firebase.auth().currentUser.uid;
    db.collection("users")
          .doc(userId)
          .get().then(doc => {
            if (doc.exists) {
              this.setState({androidid:doc.data().androidid,
              })
          }
          })
    return (
      <View style={styles.container}>
     <TouchableOpacity style={styles.button} onPress={()=>this.verify()}>
                  <Text style={styles.buttonText}>Verify Device</Text>
         </TouchableOpacity>
    </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    width: '100%',
    fontSize:15,
    marginBottom: 15,
    marginTop:8,
    paddingBottom: 0,
    alignSelf: 'center',
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
  marginBottom: 15,
  paddingVertical: 5,
  alignItems: 'center',
  backgroundColor: '#66B2FF',
  borderColor: '#66B2FF',
  borderWidth: 1,
  borderRadius: 5,
  width: 200
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