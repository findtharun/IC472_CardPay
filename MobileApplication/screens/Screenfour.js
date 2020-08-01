import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput,
    ImageBackground,
    Image,
    ScrollView,
    AsyncStorage,
    RefreshControl,
    Modal,
    Button,
} from 'react-native';
import * as Application from 'expo-application';
import firebase,{db} from '../config/Firebase'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Loading from './Loading'
import * as Network from 'expo-network';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const {height, width} = Dimensions.get('window');
const TabIcon = (props) =>(
  <MaterialIcons name="credit-card" size={30} color="#66b2ff" />
)
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default class Screenfour extends Component {
    static navigationOptions = {
        tabBarIcon: TabIcon
      };
    constructor(props) {
        super(props);
        this.state = {
            cardnumber: '',
            nameonthecard: '',
            cvv: '',
            userId:'',
            expirydate: '',
            type: '',
            isonline:'',
            image1:'',
            ok:'',
            image:null,
            result:null,
            username:'',
            loading: false,
            modalVisible:true,
            status:false,
            iscard:false,
            refreshing:false,
            androidid:'',
            androidid1:'',
            visa:'https://www.visa.com/images/merchantoffers/2020-02/1581398284208.visa_logo_400x150.jpg',
            rupay:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png',
            mastercard:'https://entrackr.com/wp-content/uploads/2019/04/Mastercard.jpg',
        }
    }
    
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
   
    onRefresh = () => {
      if(this.state.ok == '1'){
        this.setState({refreshing:true});
        wait(2000).then(() => this.setState({refreshing:false}));
      }
      else{
        this.setState({refreshing:true});
  
        wait(2000).then(() => this.setState({refreshing:false,isonline:'lock',modalVisible:true}));
      }
      
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
        this.setState({modalVisible:false,ok:'1'});
        console.warn = () => {};
       }
       else{
        this.setState({loading:false});
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
    func=(userId)=>{
      if(this.state.isonline=='lock'){
        const post={
          isonline:'unlock'
        }
        this.setState({isonline:'unlock'});
        db.collection('cards')
        .doc(userId)
        .update(post)
      }
      else{
        const post={
          isonline:'lock'
        }
          this.setState({isonline:'lock'});
          db.collection('cards')
          .doc(userId)
          .update(post)
      }
    }
    func3 = (userId) =>{
      const user = {
        cardnumber: this.state.cardnumber,
        nameonthecard: this.state.nameonthecard,
        expirydate:this.state.expirydate,
        cvv:this.state.cvv,
        type: this.state.type,
        isonline:'lock'
        }
      db.collection("cards")
        .doc(userId)
         .set(user)
  
      this.setState({iscard:'0'});
    } 
    componentDidMount  () {
      try{
         AsyncStorage.getItem('useruid').then((user1)=>{
          console.log(user1)
          this.setState({userId:user1});
          db.collection('users')
          .doc(this.state.userId)
          .get().then(doc=>{
            this.setState({username:doc.data().username,androidid:doc.data().androidid,androidid1:Application.androidId});
          })
          db.collection('cards')
          .doc(this.state.userId)
          .get().then(doc => {
            if (doc.exists) {
              this.setState({iscard:true,
               cardnumber:doc.data().cardnumber,
              nameonthecard:doc.data().nameonthecard,
            expirydate:doc.data().expirydate,
          cvv:doc.data().cvv,
        type:doc.data().type,
        isonline:doc.data().isonline
        
              })
      }
      console.log('1')
      console.log(this.state.androidid)
      console.log('1')
      console.log(this.state.androidid1)
      if(this.state.type=='Visa'||this.state.type=='visa'){
           this.setState({image1:this.state.visa })     
      }
      if(this.state.type=='rupay'||this.state.type=='Rupay'){
        this.setState({image1:this.state.rupay })     
      }
      if(this.state.type=='mastercard'||this.state.type=='Mastercard'){
       this.setState({image1:this.state.mastercard })     
      }
      })
        console.log('getdata')
        });
         }catch(error){
          alert(error)
        }
    } 
    render() {
      
     if(!this.state.iscard){
      return (
        <View style={styles.container1}>
          <TextInput
            style={styles.inputStyle1}
            placeholder="card number"
            value={this.state.cardnumber}
            onChangeText={(val) => this.updateInputVal(val, 'cardnumber')}
          />  
          <TextInput
            style={styles.inputStyle1}
            placeholder="name on the card"
            value={this.state.nameonthecard}
            onChangeText={(val) => this.updateInputVal(val, 'nameonthecard')}
          />
          <TextInput
            style={styles.inputStyle1}
            placeholder="expiry date"
            value={this.state.expirydate}
            onChangeText={(val) => this.updateInputVal(val, 'expirydate')}
          />
          <TextInput
            style={styles.inputStyle1}
            placeholder="cvv"
            value={this.state.cvv}
            onChangeText={(val) => this.updateInputVal(val, 'cvv')}
          />
          <TextInput
            style={styles.inputStyle1}
            placeholder="card type"
            value={this.state.type}
            onChangeText={(val) => this.updateInputVal(val, 'type')}
          />
          <TouchableOpacity style={styles.button1} onPress={()=>this.func3(this.state.userId)}>
                    <Text style={styles.buttonText1}>Add this Card</Text>
           </TouchableOpacity>
        </View>
      );
     }
     else{
      // if(this.state.androidid == this.state.androidid1){
  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />}>
        <Text></Text>  
        <Text></Text>
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
            <Loading
          loading={this.state.loading} />
      <Text style={styles.paragraph}>Card Pay</Text>
      <Image style={{ height:200,width:200}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAWQZxtP8fytz_nTqj51xvuR1nBaaHSKBVMA&usqp=CAU'}}/>
      <Text></Text>
      <Button onPress={()=>this.takePhoto()} title="Verify Face"></Button>
<Text></Text>
<Button onPress={()=>this.setState({modalVisible:false,isonline:''})} title="Cancel"></Button>    
          </View>
        </View>
      </Modal>
              <ScrollView horizontal={true} style={{ height:280,backgroundColor:'#cce5ff'}}>
       <View style={styles.shadow}>
           <ImageBackground style={styles.image} source={require('../images/card-front.png')}>
           <Text></Text>
            <View style={{flexDirection:'row-reverse',marginLeft:10}}>
             
            <FontAwesome onPress={()=>this.func(this.state.userId)} name={this.state.isonline} size={50} color="black" />
            
           </View>
              
  <Text style={{  fontSize:28,color:'#606060',marginLeft:16,marginTop:70}}>{this.state.cardnumber}</Text>
  <Text style={{ fontSize:16,color:'#606060',marginLeft:150}}>{this.state.expirydate}</Text>
               <View style={{flexDirection:'row-reverse'}}>
               <Image source={{uri:this.state.image1}} style={{ marginLeft:20,marginRight:10, height:30,width:75}}></Image>

               <Text style={{ fontSize:18,color:'#606060',marginLeft:16,marginBottom:30}} >{this.state.nameonthecard}</Text>
               </View>
           </ImageBackground>
       </View>
       <View style={styles.shadow}>

              <ImageBackground style={styles.image} source={require('../images/card-back.png')}>
             { this.state.status ? <Text style={{ fontSize:24,marginLeft:230,marginBottom:50}}>{this.state.cvv}</Text> :<Text style={{ fontSize:24,fontWeight:'bold', marginLeft:230,marginBottom:50}}>.....</Text>}
              </ImageBackground>
          </View>
        </ScrollView>
        <View style={{ marginBottom:190}}>
        <Text style={{textAlign:'center',fontSize:20}}>swipe right to see cvv...</Text>
      {this.state.status ? <TouchableOpacity onPress={()=>{this.setState({status:false});}}><Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:10, color:'blue'}}>hide cvv</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>{this.setState({status:true});}}><Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:10, color:'blue'}}>show cvv</Text></TouchableOpacity>}
     
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      </View>
      </ScrollView>
  );
// }
//   else{
//     return (
//     <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />}>
//         <Text></Text>  
//         <Text></Text>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={this.state.modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Loading
//           loading={this.state.loading} />
//       <Text style={styles.paragraph}>Card Pay</Text>
//       <Image style={{ height:150,width:150}} source={{uri:'https://www.samsungsfour.com/images/thumbnails/images/exclamation-fit-286x250.png'}}/>
//       <Text></Text>
//       <Text>device not found</Text>
// <Text></Text>
// <Button onPress={()=>this.setState({modalVisible:false,isonline:''})} title="exit"></Button>    
//           </View>
//         </View>
//       </Modal>
//               <ScrollView horizontal={true} style={{ height:280,backgroundColor:'#cce5ff'}}>
//        <View style={styles.shadow}>
//            <ImageBackground style={styles.image} source={require('../images/card-front.png')}>
//            <Text></Text>
//             <View style={{flexDirection:'row-reverse',marginLeft:10}}>
             
//             <FontAwesome onPress={()=>this.func(this.state.userId)} name={this.state.isonline} size={50} color="black" />
            
//            </View>
              
//   <Text style={{  fontSize:28,color:'#606060',marginLeft:16,marginTop:70}}>{this.state.cardnumber}</Text>
//   <Text style={{ fontSize:16,color:'#606060',marginLeft:150}}>{this.state.expirydate}</Text>
//                <View style={{flexDirection:'row-reverse'}}>
//                <Image source={{uri:this.state.image1}} style={{ marginLeft:20,marginRight:10, height:30,width:75}}></Image>

//                <Text style={{ fontSize:18,color:'#606060',marginLeft:16,marginBottom:30}} >{this.state.nameonthecard}</Text>
//                </View>
//            </ImageBackground>
//        </View>
//        <View style={styles.shadow}>

//               <ImageBackground style={styles.image} source={require('../images/card-back.png')}>
//              { this.state.status ? <Text style={{ fontSize:24,marginLeft:230,marginBottom:50}}>{this.state.cvv}</Text> :<Text style={{ fontSize:24,fontWeight:'bold', marginLeft:230,marginBottom:50}}>.....</Text>}
//               </ImageBackground>
//           </View>
//         </ScrollView>
//         <View style={{ marginBottom:190}}>
//         <Text style={{textAlign:'center',fontSize:20}}>swipe right to see cvv...</Text>
//       {this.state.status ? <TouchableOpacity onPress={()=>{this.setState({status:false});}}><Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:10, color:'blue'}}>hide cvv</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>{this.setState({status:true});}}><Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:10, color:'blue'}}>show cvv</Text></TouchableOpacity>}
     
//       <Text></Text>
//       <Text></Text>
//       <Text></Text>
//       <Text></Text>
//       <Text></Text>
//       <Text></Text>
//       </View>
//       </ScrollView>
//   );
//       }
     }
       
    }
}
const styles = StyleSheet.create({
    container1: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
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
    shadow: {
      shadowOffset: { width: 10, height: 15 },
      shadowColor: 'black',
      shadowOpacity: 1000,
      shadowRadius:20,
      elevation: 30,
      backgroundColor : "#0c56a6",
      width:340,
      height:230,
      borderRadius:20,
      marginLeft:10,
      marginTop:50

    },
    inputStyle1: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    loginText1: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    button1: {
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
    buttonText1:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor:'#cce5ff'
      },
    image: {
      width:340,
      height:230,
      flex: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      overflow: 'hidden',
     shadowOffset: {
	   width: 0,
	   height: 12,
     },
     shadowOpacity: 100,
     shadowRadius: 1000.00,
      elevation: 30,
      backgroundColor:'#000',
      justifyContent: "center"
    },
});
