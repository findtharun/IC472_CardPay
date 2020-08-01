import React from 'react';
import { Image,ScrollView, StyleSheet,Text, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import firebase ,{db}from '../config/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Application from 'expo-application';
import {Camera} from 'expo-camera';
import * as Network from 'expo-network';
import Loading from './Loading5';
export default class Videoupload extends React.Component {
    
        state = {
          image1: 'https://blog.cex.io/wp-content/uploads/2016/03/Selfie.jpg',
          username: '',
          androidid: Application.androidId,
          userId:firebase.auth().currentUser.uid,
          Image:null,
          result:null,
          loading:false
          }
      
        onChangeTitle = username => {
          this.setState({ username })
        }
      
        takePhoto = async () => {
          const permissionResult = await Camera.requestPermissionsAsync();
          if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
          }
            const pickerResult = await ImagePicker.launchCameraAsync({
              aspect:[4,4],
              allowsEditing: true,
              base64: true,
              quality:1,
            });
            if (pickerResult.cancelled === true) {
            return;
            }
            const imagebase='data:image/jpeg;base64,'+pickerResult.base64;
            this.setState({Image:imagebase});
            this.setState({image1:pickerResult.uri})
        };
     uploadImage = async(image) =>{
       if(this.state.username ==''){
          alert('please give a username')
          return;
       }
       else{
        const status = await Network.getNetworkStateAsync();
        if (status.isInternetReachable !== true) {
          alert('Sorry, we need internet connection');
          return;
        }
      console.log("imagelength="+image.length)
      const url = `http://35.238.139.30:5001`;
      this.setState({loading:true})
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          user: this.state.username,
          image: image
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({result:json.result});
        this.setState({loading:false});
        alert('success!  click submit to continue')
        console.log(typeof json.result)
    })
      .catch((error) => {
        console.warn(error);
      });
      
       }
       }
       func = async(user1)=>{
        const user = {
          username:this.state.username,
          androidid:this.state.androidid,
          image:this.state.image1
            }
          db.collection("users")
            .doc(user1)
            .update(user).then(()=>{
              this.props.navigation.navigate('Cardupload')   
            })

       }
      
      render() {
        if(this.state.Image==null){
        return (
        <ScrollView style={styles.container}>
          <Loading loading={this.state.loading}/>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>

        <Image
        source={{uri:this.state.image1}}
        style={{ width: 450, height: 200 }}
        />
        <Text>Note:(upload selfie photo like above) </Text>
        <Text></Text>
        <TextInput
        placeholder='Enter Username'
        style={styles.inputStyle}
        value={this.state.username}
        onChangeText={username => this.onChangeTitle(username)}
        />
        <TouchableOpacity style={styles.button1} onPress={()=>this.takePhoto()}>
          <Text style={styles.buttonText1}>Take Photo</Text>
        </TouchableOpacity>
       <Text></Text>
       
        <TouchableOpacity style={styles.button1} onPress={()=>this.uploadImage(this.state.Image)}>
          <Text style={styles.buttonText1}>submit</Text>
        </TouchableOpacity>
        
        </ScrollView>
        );
      }
      else{
        return (
          <ScrollView style={styles.container}>
            <Loading loading={this.state.loading}/>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
  
          <Image
          source={{uri:this.state.Image}}
          style={{ width: 450, height: 200 }}
          />
         
          <Text></Text>
          <TextInput
          placeholder='Enter Username'
          style={styles.inputStyle}
          value={this.state.username}
          onChangeText={username => this.onChangeTitle(username)}
          />
          <TouchableOpacity style={styles.button1} onPress={()=>this.takePhoto()}>
            <Text style={styles.buttonText1}>Take Photo</Text>
          </TouchableOpacity>
         <Text></Text>
         <TouchableOpacity style={styles.button1} onPress={()=>this.uploadImage(this.state.Image)}>
            <Text style={styles.buttonText1}>upload Image</Text>
          </TouchableOpacity>
         <Text></Text>
         
          <TouchableOpacity style={styles.button1} onPress={()=>this.func(this.state.userId)}>
            <Text style={styles.buttonText1}>submit</Text>
          </TouchableOpacity>
          
          </ScrollView>
          );

      }
     }
}
       

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 35,
    backgroundColor: '#fff'
 },
 container2: { 
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: 35,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center'
},

button1: {
  marginTop: 10,
  marginBottom: 1,
  paddingVertical: 5,
  alignItems: 'center',
  backgroundColor: '#66B2FF',
  borderColor: '#66B2FF',
  borderWidth: 1,
  borderRadius: 5,
  width: 290
},

buttonText1:{
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff'
},
inputStyle: {
  width: '100%',
  marginBottom: 1,
  paddingBottom: 15,
  alignSelf: "center",
  borderColor: "#ccc",
  borderBottomWidth: 1
}
});