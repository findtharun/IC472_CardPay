import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Details from '../screens/Details'
import Cardupload from '../screens/Cardupload'
import Tabnavigation from './Tabnavigation'
import Videoupload from '../screens/Videoupload'
import deviceverify from '../screens/deviceverify'
import Faceverify from '../screens/Faceverify'
import ok from '../screens/ok'
import Loading from '../screens/Loading'
import transact from '../screens/transact'
import transact1 from '../screens/transact1'
const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        
        Details: {
            screen: Details
        },
        Cardupload: {
            screen: Cardupload
        },
        Tabnavigation: {
            screen: Tabnavigation
        },
        Videoupload: {
            screen: Videoupload
        }, 
        deviceverify:{
            screen: deviceverify
        },
        Faceverify:{
             screen: Faceverify
        },
        Loading:{
            screen: Loading
        },
        ok: {
            screen : ok
        },
        transact:{
            screen:transact
        },
        transact1:{
            screen:transact1
        }
        
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)
