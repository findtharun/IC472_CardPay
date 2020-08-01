import React, { Component } from 'react';
import { StyleSheet,Modal, View,ScrollView, Text,RefreshControl, Button ,Image, AsyncStorage} from 'react-native';
import firebase, { db } from '../config/Firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Card} from 'react-native-paper';
const TabIcon = (props) => (
  <MaterialIcons name="notifications-none" size={24} color="#66b2ff"  />
)
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
state = { 
      amount:'',
      url:'',
      phone:'',
      username:'',
      alert:'',
      later:'0',
      displayname:'',
      modalVisible:false,
      refreshing:false
    }
  
    onRefresh = () => {
      this.setState({refreshing:true});
      db.collection('notifications')
        .doc(this.state.userId)
        .get()
        .then((doc)=>{
          if(doc.exists){
            this.setState({ alert:'1',
            modalVisible:true,
            amount:doc.data().amount,
            url:doc.data().url,
            later:'0',
            username:doc.data().username,
            phone:doc.data().phone,
            displayname:doc.data().displayname
          });
          }
          else{
             this.setState({alert:'0'}); 
          }
        })
      
  
      wait(2000).then(() => this.setState({refreshing:false}));
    }
componentDidMount  () {
  try{
     AsyncStorage.getItem('useruid').then((user1)=>{
      console.log(user1)
      this.setState({userId:user1});
      db.collection('notifications')
  .doc(this.state.userId)
  .get().then(doc => {
    if (doc.exists) {
      this.setState({
          alert:'1',
          modalVisible:true,
          amount:doc.data().amount,
          url:doc.data().url,
          username:doc.data().username,
          phone:doc.data().phone,
          displayname:doc.data().displayname
      })
  }
  else{
    this.setState({alert:'0'});
  }
  })
    
    });
     }catch(error){
      alert(error)
    }
} 
update = () =>{
  this.setState({later:'1'});
}
pay = ()=>{
 console.log('pay clicked')
  this.setState({modalVisible:false});
  this.props.navigation.navigate('Faceverify')
} 
decline = () =>{
    console.log('pay declined')
    this.setState({modalVisible:false});
    this.props.navigation.navigate('transact1')
}
  render() {
      if(this.state.alert=='1'){
        if(this.state.later=='0'){
          return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />}>
              <Text style={{fontSize:24,textAlign:'center',fontWeight:'bold',marginTop:30, color:'#66b2ff'}}>NOTIFICATIONS</Text>
              <View style={{borderRadius:20,height:50,margin:20,borderColor:'#606060'}}>
       
            </View>
              <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
      <Text style={{fontWeight:'bold'}}>Requested By</Text>
      <Text></Text>
      <Image style={{height:70,width:70}} source={{uri:'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}}></Image>
      <Text></Text>
      <Text style={{fontWeight:'bold'}}>{this.state.displayname}</Text>
      <Text style={{color:'#606060'}}>{this.state.phone}</Text>
      <Text style={{color:'#606060'}}>{this.state.username} <AntDesign name="checkcircle" size={12} color="#2296f3" /></Text>
     
      <Text style={{fontSize:30,fontWeight:'bold'}}><FontAwesome name="rupee" size={30} color="black" />{this.state.amount}</Text>
      <Button onPress={()=>this.pay()} style={{width:100}} title="                        pay                     "></Button>
      <Text></Text>
      <View style={{flexDirection:'row'}}>
        <Text onPress={()=>this.update()}  style={{ fontSize:15,fontWeight:'bold',color:'#2296f3'}}>LATER</Text>
        <Text>         </Text>
        <Text>         </Text>
        <Text onPress={()=>this.decline()} style={{ fontSize:15,fontWeight:'bold',color:'#2296f3'}}>DECLINE</Text>
      </View>    
          </View>
        </View>
      </Modal>
      
          </ScrollView>
          );
        }
        else{
          return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />}>
              <Text style={{fontSize:24,textAlign:'center',fontWeight:'bold',marginTop:30, color:'#66b2ff'}}>NOTIFICATIONS</Text>
              <Card style={{shadowColor: "#000",shadowOffset: {width: 0,height: 8,},shadowOpacity: 0.44,shadowRadius: 10.32,elevation: 16,}}>
          <View style={{ flexDirection:'row',margin:20 }}>
            <Image
              source={{
                uri:
                  'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
              }}
              style={{
                width: 80,
                height: 80,
                margin:20
              }}
            />
            <View style={{flexDirection:'column'}}>
            <Text style={{fontWeight:'bold'}}>{this.state.displayname}</Text>
            <Text style={{color:'#606060'}}>{this.state.phone}</Text>
            <Text style={{color:'#606060'}}>{this.state.username} <AntDesign name="checkcircle" size={12} color="#2296f3" /></Text>
            <Text style={{fontSize:24,fontWeight:'bold'}}><FontAwesome name="rupee" size={24} color="black" />{this.state.amount}</Text>
             <View style={{flexDirection:'row'}}>
             <Text onPress={()=>this.pay()}  style={{ fontSize:18,fontWeight:'bold',color:'#2296f3'}}>PAY </Text>
             <Text>         </Text>
             <Text>         </Text>
             <Text onPress={()=>this.decline()} style={{ fontSize:18,fontWeight:'bold',color:'#2296f3'}}>DECLINE</Text>
     
             </View>

            </View>
            
          </View>
         
        </Card>
      
      
          </ScrollView>
          );
        }
        
      }
      else{
          return(
           <ScrollView style={{flex: 1,backgroundColor: '#fff'}} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />}>
                           <Text style={{fontSize:24,textAlign:'center',fontWeight:'bold',marginTop:60,marginLeft:20, color:'#66b2ff'}}>NOTIFICATIONS</Text>
             <View style={{marginTop:200}}>
             <Text style={{textAlign:'center'}}>no new notifications</Text>
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAwwgZLZWcxb8HrR05dPPYSd8fkHHgFI5clQ&usqp=CAU'}} style={{height:200,width:200,alignSelf:'center'}}></Image>
           
             </View>
           </ScrollView>
          );
          
      }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    marginTop:30
  },
  centeredView: {
    flex: 1,
    height:150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30
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