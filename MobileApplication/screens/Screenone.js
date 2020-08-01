import React, { Component } from 'react';
import { StyleSheet, View,ScrollView, Text ,Image, AsyncStorage} from 'react-native';
import firebase, { db } from '../config/Firebase';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import  * as Notifications from 'expo-notifications';
import { Feather } from '@expo/vector-icons';
import * as Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
const TabIcon = (props) => (
  <SimpleLineIcons name="user" size={30} color="#66b2ff" />
)
export default class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
state = { 
      displayname:'',
      pancard:'',
      aadhar:'',
      phone:'',
      image:'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      username:'',
      userId:'',
      expopushtoken:''
    }
  
  
componentDidMount  () {
  try{
     AsyncStorage.getItem('useruid').then((user1)=>{
      console.log(user1)
      this.setState({userId:user1});
      db.collection('users')
  .doc(this.state.userId)
  .get().then(doc => {
    if (doc.exists) {
      this.setState({pancard:doc.data().pancard,
        displayname:doc.data().displayname,
      aadhar:doc.data().aadhar,
    phone:doc.data().phone,
  username:doc.data().username,
     image:doc.data().image ,
     email:doc.data().emailId
      })
  }
  })
    
    });
     }catch(error){
      alert(error)
    }
} 
getupdates = async() =>{
    try{
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this.setState({ expopushtoken: token });
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
     const token= (await Notifications.getExpoPushTokenAsync()).data;
        this.setState({expopushtoken:token});
        const expotoken={
          expopushtoken:this.state.expopushtoken
        }
        db.collection('users')
        .doc(this.state.userId)
        .update(expotoken).then(()=>{
          console.log(this.state.expopushtoken);
        })
    }catch(error){
      console.log(error)
    }
} 

signOut = async() => {
  try{
    // await AsyncStorage.setItem('isloggedin','0');
    //   await AsyncStorage.setItem('useruid','');
      firebase.auth().signOut().then(async() => {
        await AsyncStorage.setItem('isloggedin','0');
         await AsyncStorage.setItem('useruid','');
        this.props.navigation.navigate('Login')
      }).catch(error => this.setState({ errorMessage: error.message }))
  }catch(error){

  } 
}  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ height:150,backgroundColor:'#66b2ff',borderBottomLeftRadius:75,borderBottomRightRadius:75}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:24,color:'#fff',textAlign:'center',fontWeight:'bold', marginLeft:150,marginTop:5}}>Profile</Text>
        <TouchableOpacity onPress={()=>this.signOut()}><Text style={{fontSize:17,color:'#fff',marginLeft:70,marginTop:10, textAlign:'center'}}>Log-out</Text></TouchableOpacity>
        </View>
        <Image style={{ height:120,width:120,borderRadius:60,borderWidth:5,borderColor:'#fff', marginLeft:120,marginTop:50}} source={{uri:this.state.image}}></Image>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Text style={{ marginTop:60,textAlign:'center', fontSize:24}}>{this.state.displayname}</Text>
          <View style={{ flexDirection:'row',justifyContent:'center'}}>
          <MaterialIcons name="email"  size={30} color="black" />
           <Text style={{ textAlign:'center',marginLeft:5,marginTop:2, fontSize:17}}>{this.state.email}</Text>
          </View>
         <Text></Text>
         <Text></Text>
         <View style={styles.text}>
         <Feather style={{marginLeft:20,marginTop:5}} name="user" size={40} color="black" />
           <Text style={styles.datatext}>{this.state.username}</Text>
          </View>
          <Text></Text>
          <View style={styles.text}>
          <Image style={{marginLeft:20,marginTop:5, height:40,width:40}} source={{uri:'https://cdn.iconscout.com/icon/premium/png-256-thumb/aadhaar-card-2032687-1718855.png'}}></Image>
           <Text style={styles.datatext}>{this.state.aadhar}</Text>
          </View>
          <Text></Text>

          <View style={styles.text}>
          <Image style={{marginLeft:20,marginTop:5, height:40,width:40}} source={{uri:'https://5.imimg.com/data5/KF/VX/MY-54036343/pan1-250x250.png'}}></Image>
           <Text style={styles.datatext}>{this.state.pancard}</Text>
          </View>
          <Text></Text>

          <View style={styles.text}>
          <Entypo style={{marginLeft:20,marginTop:5}} name="old-phone" size={40} color="black" />
           <Text style={styles.datatext}>{this.state.phone}</Text>
          </View>
  </ScrollView>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    marginTop:30
   
  },
  text:{
    flexDirection:'row', 
    borderWidth:0.1,
    marginLeft:10,
    marginRight:10,
     borderRadius:10,
     height:50
    },
  datatext: {
    marginTop:10,
    fontSize:20,
    marginLeft:10,
    color:'#606060'
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
