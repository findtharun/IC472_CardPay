import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import firebase, { db } from '../config/Firebase';
import Constants from 'expo-constants'
import * as Network from 'expo-network';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Application from 'expo-application';
import Loading from '../screens/Loading';
import Loading1 from '../screens/Loading4';
import { Ionicons } from '@expo/vector-icons';
export default class Faceverify extends React.Component {
  state = {
    uid:firebase.auth().currentUser.uid,
    image:null,
    result:null,
    username:'',
    androidid:'',
    androidid1:Application.androidId,
    loading: false,
    loading1:false,

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
      this.setState({image:imagebase});
      console.log('1')
      this.uploadImageAsync(this.state.image);
  };
  userverify = ( ok ) => {
     if(ok=='SUCCESS'){
      this.props.navigation.navigate('transact')
      console.warn = () => {};
     }
     else{
      this.setState({loading:false});
      this.props.navigation.navigate('transact1')
     }
  }
  
 uploadImageAsync = async(image1) => {
  this.setState({
    loading: true
  });
    const status = await Network.getNetworkStateAsync();
      if (status.isInternetReachable !== true) {
        alert('Sorry, we need internet connection');
        return;
      }
    console.log("imagelength="+image1.length)
    const url = `http://35.238.139.30:5000`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user: this.state.username,
        image: image1
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {this.setState({result:json.result}); this.userverify(this.state.result);console.log('2');alert('Face verified successfully!');console.log(json.result)})
    .catch((error) => {
      console.warn(error);
    });
   
  }
  
  render()
  {
    db.collection('users')
  .doc(this.state.uid)
  .get().then((doc) => {
    if (doc.exists) {
      this.setState({
      username:doc.data().username,
      androidid:doc.data().androidid
    });
  }
  })
   if(this.state.androidid == this.state.androidid1){
  return (
    <View style={styles.container}>
      <Loading1 loading ={this.state.loading1}/>
       <Loading
          loading={this.state.loading} />
          <View style={{flexDirection:'column'}}>
      <Ionicons style={{marginLeft:20,marginTop:30}} onPress={()=>{this.props.navigation.navigate('Tabnavigation')}} name="ios-arrow-back" size={30} color="black" />
      <Text style={styles.paragraph}>Card Pay</Text>
      </View>
      <Image style={{ height:200,width:200,marginLeft:75}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAWQZxtP8fytz_nTqj51xvuR1nBaaHSKBVMA&usqp=CAU'}}/>
      <Text></Text>
      <Text style={{textAlign:'center'}}>(Note:Please show your frontal-face to verify )</Text>
      <TouchableOpacity onPress={this.takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Verify Face</Text>
      </TouchableOpacity>

    </View>
  );
  }
  else{
    return(
      <View style={{flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',marginBottom:200}}>
      <Ionicons style={{marginLeft:20,marginRight:300,marginBottom:200}} onPress={()=>{this.props.navigation.navigate('Tabnavigation')}} name="ios-arrow-back" size={30} color="black" />

        <Image style={{ height:150,width:150}} source={{uri:'https://www.samsungsfour.com/images/thumbnails/images/exclamation-fit-286x250.png'}}/>
        <Text style={{textAlign:'center'}}>{this.state.androidid1}</Text>
        <Text>device not found</Text>
      </View>
    );
  }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    alignContent:'center',
    padding: 8,
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
  width: 200,
  marginLeft:75
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  paragraph: {
    margin: 44,
    marginTop:90,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

   thumbnail: {
    alignItems:'center',
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

