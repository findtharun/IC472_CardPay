import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatBot from 'react-native-chatbot'; 
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
  <Ionicons
    name={'ios-chatboxes'}
    size={30}
    color= "#66b2ff"
  />
)
const steps = [
  {
    id: '0',
    message: 'welcome to cardpay assistant ',
    trigger: '0.5',
  },
  {
    id: '0.5',
    message: 'say hello to start the conversation! ',
    trigger: '0.75',
  },
  {
    id: '0.75',
    user:true,
    trigger: '1',
  },
  {
    id: '1',
    options:[ 
      {value:1,label:'How to use card Pay? ',trigger:'2'},
      {value:2,label:' how cardpay ensures safety?  ',trigger:'3'},
      {value:2,label:'How to check Virual debit card Balance?  ',trigger:'4'},
      {value:2,label:'Why CardPay locks the card? ',trigger:'5'},

    ],  
  },
  {
    id:'2',
    message:'visit our website.',
    trigger:'7',
  },
  {
    id:'3',
    message:'we provide a phishing merchant authentication and also card pay trust score and rate a website. Though transacting depends on the users will ',
   trigger:'7',
  },
  {
    id:'4',
    message:'Please goto Virtual debit card option in the app.',
    trigger:'7',
  },
  {
    id:'5',
    message:'For Fraud prvention and you can unlock the card only if your face is recognized.',
    trigger:'7',
  },
  {
    id:'7',
    message:'is there any other query?',
   trigger:'7.5',
  },
  {
    id: '7.5',
    options:[
      {value:1,label:'Yes ',trigger:'1'},
      {value:2,label:'No',trigger:'8'},
    ]  ,
  },
  {
    id:'8',
    message:'Happy to help!',
    end:true,
  },
];
console.warn = () => {};
export default class Screentwo extends React.Component{
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
  render(){
  return(
    <View style={Styles.container}>
    <ChatBot steps={steps}/>
    </View>
  );

  }
}
const Styles=StyleSheet.create({
  container:{
   flex:1,
   marginTop:30
  }
})