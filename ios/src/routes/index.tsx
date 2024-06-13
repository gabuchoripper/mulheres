import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/authContext';
import {View} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import AppRoutes from "./app.routes";
import GuestRoutes from './guest.routes';
import * as ImagePicker from 'expo-image-picker';






function Routes(){
    const {isAuthenticated} = useContext(AuthContext)
    const { loading } = useContext(AuthContext)
   

if(loading){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#f5f7fb'}}>
            <ActivityIndicator color='#1d1d2e' size={60} />
        </View>
    )
}
    return (
        <>
            {isAuthenticated ? <AppRoutes/>:<GuestRoutes/>}
        </>
        
    )
}

export default Routes;