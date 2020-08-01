import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image ,AsyncStorage} from 'react-native';
import { Button } from 'react-native';
import { db } from '../config/Firebase';

export default class transact extends React.Component{
  state={
    userId:'',
    amount:'',
    phone:'',
    displayname:'',
    username:''
  }
  componentDidMount  () {
    try{
       AsyncStorage.getItem('useruid').then((user1)=>{
        console.log(user1)
        this.setState({userId:user1});
        db.collection('notifications')
          .doc(this.state.userId)
          .get().then((doc)=>{
            if(doc.exists){
              const user={
                displayname:doc.data().displayname,
                username:doc.data().username,
                phone:doc.data().phone,
                amount:doc.data().amount
              }
              db.collection('failure')
              .doc(this.state.userId)
              .set(user).then(()=>{
                db.collection('notifications')
                  .doc(this.state.userId)
                  .delete()
              })
            }
          })
      });
      
       }catch(error){
        alert(error)
      }
  } 
    render(){
  return (
    <View style={styles.container}>
        <Image style={{height:50,width:50}} source={{uri:'https://jumeirahroyal.com/wp-content/uploads/d7e50cb89c.png'}}></Image>
      <Text>Transaction Failed!</Text>
      <Text></Text>
      <Button onPress={()=>{this.props.navigation.navigate('Tabnavigation')}} title="go to home page >"></Button>
      <StatusBar style="auto" />
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});