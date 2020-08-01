import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert,TextInput,Component } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import firebase ,{db}from '../config/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Cardupload extends React.Component {
    
        state = {
          image1:'',
          image2:'',
          uid:firebase.auth().currentUser.uid,
          image1: 'https://i1.wp.com/365webresources.com/wp-content/uploads/2018/06/Blank-white-credit-card-PSD-template-min.png?resize=525%2C354&ssl=1',
          image2:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7fa47UfPaEvyTU2aLjeM7sQWnV6USesuGYADC8GxKePtOCrSD&usqp=CAU',
        }
      
      
        selectImage1 = async () => {
          try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
            });
            if (!result.cancelled) {
              this.setState({ image1: result.uri });
            }
      
            console.log(result);
          } catch (E) {
            console.log(E);
          }
        }
        selectImage2 = async () => {
          try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
            });
            if (!result.cancelled) {
              this.setState({ image2: result.uri });
            }
      
            console.log(result);
          } catch (E) {
            console.log(E);
          }
        }
      onSubmit =  (userId) => {
          const post = {
            image1: this.state.image1,
            image2:this.state.image2,
          }
          db.collection('users')
            .doc(userId)
            .update(post).then(()=>{
              this.setState({
                image1: 'https://i1.wp.com/365webresources.com/wp-content/uploads/2018/06/Blank-white-credit-card-PSD-template-min.png?resize=525%2C354&ssl=1',
                image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7fa47UfPaEvyTU2aLjeM7sQWnV6USesuGYADC8GxKePtOCrSD&usqp=CAU',
              })
              alert("success")
              this.props.navigation.navigate('Login')
            })
      }
  
      render() {
        return (
        
        <View style={styles.container}>
        <Image
        source={{uri:this.state.image1}}
        style={{ width: 300, height: 200 }}
        />
        <Text>Note:(upload card photo like above) </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.selectImage1()}>
          <Text style={styles.buttonText}>Front-side</Text>
        </TouchableOpacity>
        
        
        <Image
        source={{uri:this.state.image2}}
        style={{ width: 300, height: 200 }}
        />
        <Text>Note:(upload card photo like above) </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.selectImage2()}>
          <Text style={styles.buttonText}>Back-side</Text>
        </TouchableOpacity>
        
        
       <Text></Text>
        
        
        <TouchableOpacity style={styles.button1} onPress={()=>this.onSubmit(userId)}>
          <Text style={styles.buttonText1}>submit</Text>
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
 button: {
  marginTop: 20,
  marginBottom: 15,
  paddingVertical: 5,
  alignItems: 'center',
  backgroundColor: '#66B2FF',
  borderColor: '#66B2FF',
  borderWidth: 1,
  borderRadius: 5,
  width: 100
},
button1: {
  marginTop: 10,
  marginBottom: 30,
  paddingVertical: 5,
  alignItems: 'center',
  backgroundColor: '#66B2FF',
  borderColor: '#66B2FF',
  borderWidth: 1,
  borderRadius: 5,
  width: 260
},
buttonText:{
  fontSize: 10,
  fontWeight: 'bold',
  color: '#fff'
},
buttonText1:{
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff'
},
inputStyle: {
  width: '100%',
  marginBottom: 15,
  paddingBottom: 15,
  alignSelf: "center",
  borderColor: "#ccc",
  borderBottomWidth: 1
}
});