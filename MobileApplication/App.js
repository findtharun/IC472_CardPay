import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar, AsyncStorage} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Tabnavigation from './navigation/Tabnavigation'
import SwitchNavigator from './navigation/SwitchNavigator';
import SwitchNavigator1 from './navigation/SwitchNavigator1';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';
import { TouchableOpacity } from 'react-native-gesture-handler';
const slides = [
    {
      key: 1,
      title: 'OUR VISION',
      text: 'Our Solution Helps to Prevent B2B or B2C Fradulent Transactions.',
      image: require('./images/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'CHAT ASSISTANT',
      text: 'We offer 24*7 chat support. ',
      image: require('./images/3.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'SECURITY',
      text: ' Payments are More Secure now',
      image: require('./images/2.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom:60
  },
  image: {
    width:500,
    height:500
  },
  text: {
      marginTop:50,
      fontSize:20,
      fontWeight:'bold',
      color:'blue',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom:50,
    color: 'blue',
    fontWeight:'bold',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircle1: {
    width: 50,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends React.Component {
    state = {
        showRealApp: false,
        check:'',
        check1:'',
      }
      _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
      _onDone = () => {
        return (
            <View style={styles.buttonCircle}>
              <Icon
                name="md-checkmark"
                color="rgba(255, 255, 255, .9)"
                size={24}
                onPress={()=>this.setState({showRealApp:true})}
              />
            </View>
          );
      }
      _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-round-forward"
              color="blue"
              size={35}
             
            />
          </View>
        );
      };
    
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon name="md-checkmark" color="blue" size={24} onPress={()=>this.setState({showRealApp:true})} />
          </View>
        );
      };
      _renderSkipButton = () => {
        return (
          <View style={styles.buttonCircle1}>
            <TouchableOpacity onPress={()=>this.setState({showRealApp:true})}><Text style={{color:'blue',fontSize:15}}>SKIP</Text></TouchableOpacity>
          </View>
        );
      };
     componentDidMount = async() =>{
        try{
          Notifications.addNotificationResponseReceivedListener(() => {
            this.props.navigation.navigate('Signup')
          });
          AsyncStorage.getItem('introduction').then((user1)=>{
            this.setState({check1:user1});
           })
       AsyncStorage.getItem('isloggedin').then((user1)=>{
        this.setState({check:user1});
       })
          }catch(error){
            
          }
       
      }
      render() {
       
        console.disableYellowBox = true;
        if (this.state.showRealApp) {
            if(this.state.check=='1'){
              return <SwitchNavigator1/>
            }
            else{
              return <SwitchNavigator />;
            }
        } else {
          if(this.state.check=='0'){
          return  <AppIntroSlider
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderSkipButton={this._renderSkipButton}
          renderItem={this._renderItem}
          showSkipButton
          data={slides}
        />}
        else{
          if(this.state.check=='1'){
            return <SwitchNavigator1/>
          }
          else{
            return <SwitchNavigator />;
          }
        }
          }
       }
      }
