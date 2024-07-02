import React , {useState} from 'react';
import {useWindowDimensions , StatusBar , StatusBarProps}from 'react-native'
import Dashboard from '../pages/dashboard';
import Contato from '../pages/contato';
import Sobre from "../pages/sobre";
import Cadastro from '../pages/cadastro';
import Login from '../pages/login';
import { PaperProvider  , DefaultTheme,Text, overlay } from 'react-native-paper'
import { Appearance } from 'react-native';
import {StatusBarStyle} from "expo-status-bar";


//import {createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();





export type RoutesNavigateParams = {
    Dashboard:undefined;
   
}
const lightTheme = {
  ...DefaultTheme,
  roundness:2,
  colors:{
    primary:'#dba99e',
    background:'#fcedf8',
    accent:'#550000',
    danger:'#ed1c24',
    font:'#181818',
    onSurfaceVariant: '#181818'
  }
}


const darktheme = {
  ...DefaultTheme,
  roundness:2,
  colors:{
    primary:'#ffdbd4',
    background:'#181818',
    accent:'#bbaaaa',
    danger:'#ed1c24',
    font:'#eee',
    onSurfaceVariant: '#eee'
  }
}


const colorscheme  = Appearance.getColorScheme();


const Drawer = createDrawerNavigator();



function DrawerMenu() {

  const dimensions = useWindowDimensions();



  return (
    
        <Drawer.Navigator defaultStatus='open' screenOptions={{
          drawerType: dimensions.width >= 768 ? 'permanent' : 'front'
        }}  >
          <Drawer.Screen name="Quem somos" component={Dashboard} options={{headerShown:false}}/>
          <Drawer.Screen name="Sobre" component={Sobre} options={{headerShown:false}}/>
          <Drawer.Screen name="Contato" component={Contato} options={{headerShown:false}}/>
          
          <Drawer.Screen name="Login" component={Login} options={{headerShown:false}}/>
        </Drawer.Navigator>

       
        
    
    
  );
}

function GuestRoutes() {
  
  
  let currenttheme ={};
  
  
  if(colorscheme =='light'){
    currenttheme=lightTheme;
  }else{
    currenttheme=lightTheme;
  }
  const bartheme  = `${colorscheme}-content`
  return (

    <>
      <StatusBar barStyle={bartheme} />
       <PaperProvider theme={currenttheme}>
        <Stack.Navigator>

          <Stack.Screen name="Drawer" component={DrawerMenu} options={{ headerShown: false   }} />
        </Stack.Navigator>
      </PaperProvider>
    </>
   
    
  );
}

export default GuestRoutes;

/*
<Stack.Screen name="BottomMenu" component={MenuBottomGuest} options={{ headerShown: false }} />


*/