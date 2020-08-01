import React  from 'react';
import { StyleSheet,ScrollView, Text, View, Alert,Image,AsyncStorage, TouchableOpacity} from 'react-native';
import firebase, { db } from '../config/Firebase';
import { Feather } from '@expo/vector-icons';
import { TextInput} from 'react-native-paper'
import Loading from './Loading1';
import  * as Notifications from 'expo-notifications';
export default class Login extends React.Component {
  
state = { 
      email: '', 
      password: '',
      loading: false,
      iconname:'eye-off',
      entry:true
    }
  

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  storedata = async(userId) =>{
    try{
      await AsyncStorage.setItem('isloggedin','1');
      await AsyncStorage.setItem('useruid',userId);
      await AsyncStorage.setItem('introduction','0');
    } catch (error) {
      // Error saving data
    }
  }
  userLogin = async() => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        loading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        const userId= firebase.auth().currentUser.uid;
        this.storedata(userId);
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        db.collection('users')
           .doc(userId)
           .get().then(doc => {
            if (doc.exists) {
              this.props.navigation.navigate('Tabnavigation')
            }
            else{
              alert('please provide your details to proceed')
              this.props.navigation.navigate('Details')
            }
          })
        
      })
      .catch(error => {alert(error) ,this.setState({loading:false})})
    }
  }
 changeicon=()=>{
    if(this.state.iconname=='eye'){
      this.setState({iconname:'eye-off',entry:true});
    }
    else{
       this.setState({iconname:'eye',entry:false});
    }
 }
 componentDidMount = () =>{
  Notifications.addNotificationResponseReceivedListener(() => {
    this.props.navigation.navigate('Signup')
  });
 }
  render() {   
    
    return (
      <ScrollView style={{ flexDirection:'column'}}>
        <Loading
          loading={this.state.loading} />
        <View style={{ backgroundColor:'#f35456',elevation:50,shadowColor:'#000000',shadowOpacity:2,borderBottomLeftRadius:30,borderBottomRightRadius:30,marginTop:30,height:200}}>
           <Image  style={{height:150,width:200,marginTop:50,borderBottomLeftRadius:30,borderBottomRightRadius:30}} source={require('../images/loginpageimage.png')}></Image>
        </View>
        <View style={{marginBottom:300}}>
        <View style={{backgroundColor:'#fff',marginLeft:38,height:100}}>
          <Text></Text>
         <Text style={{ fontSize:20,color:'#505050'}}>Welcome back,</Text>
         <Text style={{fontSize:17,color:'#606060',marginTop:10}}>Please login to continue</Text>
        </View>
        <View style={{height:400}}>  
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
        <Feather style={{marginTop:15}} name={this.state.iconname} onPress={()=>{
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
    marginBottom: 5,
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
