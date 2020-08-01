import React, { Component ,useState} from 'react';
import { StyleSheet, View, Text,Image, AsyncStorage} from 'react-native';
import firebase, { db } from '../config/Firebase';
import { SimpleLineIcons } from '@expo/vector-icons';
const TabIcon = (props) => (
  <SimpleLineIcons name="user" size={35} color="blue" />
)
export default class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
  constructor() {
    super();
    this.state = { 
     
      pancard:'',
      aadhar:'',
      phone:'',
      image:'',
      username:'',
      userId:''
    }
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
      aadhar:doc.data().aadhar,
    phone:doc.data().phone,
  username:doc.data().username,
image:doc.data().image,
     image1:doc.data().image1 ,
     email:doc.data().emailId
      })
  }
  })
    console.log('getdata')
    });
     }catch(error){
      alert(error)
    }
} 

signOut = async() => {
  try{
      await AsyncStorage.setItem('isloggedin','0');
      await AsyncStorage.setItem('useruid','');
      firebase.auth().signOut().then(() => {
        AsyncStorage.setItem('isloggedin','0');
        AsyncStorage.setItem('useruid','');
        this.props.navigation.navigate('Login')
      }).catch(error => this.setState({ errorMessage: error.message }))
  }catch(error){

  }
  
  
}  
  render() {

    
    var img=this.state.image;
    return (
      <View style={styles.container}>  
     <Loading
          loading={this.state.loading} />
      <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsYnvWL-xskIvCSaQvGXb3GEEUv-tKMIz6rDadGgwQz9no5uLw&usqp=CAU'}} style={{width:290,height:100,marginBottom:60}}/>
       <TextInput
       mode ='outlined'
       style={styles.inputStyle}
        label='Enter Email'
        underlineColor='transparent'
        value={this.state.email}
        onChangeText={(val) => this.updateInputVal(val, 'email')}
      />
      <View style={{flexDirection:'row'}}>
        <TextInput
         mode='outlined'
          style={styles.inputStyle1}
           label='Enter Password'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={this.state.entry}
        > 
       </TextInput>
        <Feather style={{marginTop:15,}} name={this.state.iconname} onPress={()=>{
         if(this.state.iconname=='eye')
         this.setState({iconname:'eye-off',entry:true});
        else
        this.setState({iconname:'eye',entry:false});
         }} size={30} color="black" /> 
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>this.userLogin()}>
                  <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>   
       
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